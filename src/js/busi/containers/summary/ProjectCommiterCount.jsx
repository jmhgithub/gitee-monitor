import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { withRouter } from 'react-router-dom'
import echarts from 'echarts'
class ProjectFileCount extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dataAxis = ['a', 'b', 'c', 'd', 'e', 'f', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
		this.data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
		this.yMax = 500;
		this.dataShadow = [];
		for (var i = 0; i < this.data.length; i++) {
			this.dataShadow.push(this.yMax);
		}
		this.option = {
			title: {
				text: '项目文件个数',
				subtext: '项目文件过多可能该应用过于复杂，应考虑拆分应用'
			},
			xAxis: {
				data: this.dataAxis,
				axisLabel: {
					inside: false,
					textStyle: {
						color: '#000'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				z: 10
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				}
			},
			dataZoom: [
				{
					type: 'inside'
				}
			],
			series: [
				{ // For shadow
					type: 'bar',
					itemStyle: {
						normal: { color: 'rgba(0,0,0,0.05)' }
					},
					barGap: '-100%',
					barCategoryGap: '40%',
					data: this.dataShadow,
					animation: false
				},
				{
					type: 'bar',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[
									{ offset: 0, color: '#83bff6' },
									{ offset: 0.5, color: '#188df0' },
									{ offset: 1, color: '#188df0' }
								]
							)
						},
						emphasis: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[
									{ offset: 0, color: '#2378f7' },
									{ offset: 0.7, color: '#2378f7' },
									{ offset: 1, color: '#83bff6' }
								]
							)
						}
					},
					data: this.data
				}
			]
		};
		this.zoomSize = 6;
	}



	onChartClick = (params) => {
		console.log(this.dataAxis[params.dataIndex])
		this.props.history.push('/project');
	}
	onEvents = {
		'click': this.onChartClick
	}
	render() {
		return (
			<div className="chart">
				<ReactEcharts
					option={this.option}
					notMerge={true}
					lazyUpdate={true}
					theme={"theme_name"}
					onChartReady={null}
					onEvents={this.onEvents}
				/>
			</div>
		);
	}

}

export default withRouter(ProjectFileCount);

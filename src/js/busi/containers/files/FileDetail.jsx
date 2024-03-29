import React from 'react';
import { Statistic, Row, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import Commiter from '../../components/Commiter'
import CodeAndCommiters from './CodeAndCommiters'

class FileDetail extends React.PureComponent {
	constructor(props) {
		super(props);
		this.commiter=['李','王','陈','杨','赵']
	}
	render() {
		console.log('======')
		return (
			<div className="chart">
				<Row gutter={16}>
					<Col span={12}>
						<Statistic title="代码行数" value={112893} />
					</Col>
					<Col span={12}>
						<Statistic title="复杂度" value={12} precision={2} />
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Statistic title="注释率" value={'10%'} />
					</Col>
					<Col span={12}>
						<Statistic title="其他" value={'AAA'} precision={2} />
					</Col>
				</Row>
				{/* <Row gutter={16}>
					<Col span={12}>
						<Statistic title="贡献者" value={''} />npm
						<div>
							{this.commiter.map((item,index)=>{
								return <Commiter key={index} commiter={item}/>
							})}
						</div>
					</Col>
				</Row> */}
				<CodeAndCommiters />
			</div>
		)
	}

}

export default withRouter(FileDetail);

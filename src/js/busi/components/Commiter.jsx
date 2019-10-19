import React from 'react';
import { Avatar } from 'antd';
class Commiter extends React.PureComponent {
	constructor(props) {
		super(props);
		this.randomColorMap=['#2db7f5','#f50','#87d068','#108ee9','#93FF93']
	}
	getRandomColorMap=()=>{
		let index=Math.floor(Math.random() * 5)
		return this.randomColorMap[index];
	}
	render() {
		return (
		<Avatar style={{ marginLeft:'5px', color: '#000', backgroundColor: this.getRandomColorMap() }}>{this.props.commiter}</Avatar>		)
	}

}

export default Commiter;

import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import cytoscape from 'cytoscape';
import $ from 'jquery';

export default class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	clearData() {
		this.cyTool.clearData();
	}
	initCyTool(cyTool) {
		this.cyTool = cyTool;
		this.cy = this.cyTool.getCytoscape();
	}
	selectFile() {
		$.get('data/data.json').then((data) => {
			this.cyTool.reloadData(data);
		});
	}
	exportData() {
		console.log(this.cy.json());
	}
	render() {
		return <div className = 'class-toolbar' >
			< button
		onClick = {
			() => {
				this.selectFile();
			}
		} > 选择文件 < /button>  < button
		onClick = {
			() => {
				this.clearData();
			}
		} > 清空数据 < /button> < button
		onClick = {
			() => {
				this.exportData();
			}
		} > 导出数据 < /button> < /div >
	}
}

import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import {
	layoutOptions
} from '../../etc';
import EditorTabs from './EditorTabs'

export default class EditPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			milestone: 'init'
		};
	}
	getLayoutOption() {
		return this.refs.editorTabs.getLayoutOption();
	}
	render() {
		if (this.state.milestone == 'init') {
			return this.renderInit();
		} else {
			return this.renderInited();
		}
	}
	renderInit() {
		return <div > < /div>;
	}
	renderInited() {
		return <div className = 'class-edit-panel' >
			< EditorTabs ref = 'editorTabs' / >
			< /div >
	}
	getChildContext() {
		return {
			cytoscape: this.cy
		}
	}
	initCytoscape(cy, config) {
		this.cy = cy;
		this.config = config;
		this.setState({
			milestone: 'inited'
		});
	}
}
EditPanel.childContextTypes = {
	cytoscape: React.PropTypes.any
}

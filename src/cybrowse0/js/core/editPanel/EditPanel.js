import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import {
	layoutOptions
} from '../../etc';
import EditorTabs from './EditorTabs';
import store from '../../proc/store';

export default class EditPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			milestone: 'init'
		};
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
		return < div className = 'class-edit-panel' >
			< EditorTabs ref = 'editorTabs' / >
		< /div >
	}
	getChildContext() {
		return {
			cytoscapeMgr: this.cytoscapeMgr
		};
	}

	initCytoscapeMgr(cytoscapeMgr) {
		this.cytoscapeMgr = cytoscapeMgr;
		this.cy = cytoscapeMgr.getCytoscape();
		this.config = cytoscapeMgr.getConfig();
		this.setState({
			milestone: 'inited'
		});
	}
}
EditPanel.childContextTypes = {
	cytoscapeMgr: React.PropTypes.object
}

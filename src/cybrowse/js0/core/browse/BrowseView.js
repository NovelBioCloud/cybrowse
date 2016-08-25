/**==============================**/
import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import assert from 'assert';
import $ from 'jquery';
import _ from 'lodash';
import {
	MuiThemeProvider,
	getMuiTheme,
	AppBar,
	lightBaseTheme,
	lightBlueA400
} from 'material-ui';
/**==============================**/
import {
	Milestone
} from '../../lib';
/**==============================**/
import EditPanel from '../editPanel';
import CyPanel from '../cyPanel';
import BrowseCtrl from './BrowseCtrl';
import Toolbar from '../toolbar';

export default class BrowseView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			milestone: this.init,
			defaultConfig: props.defaultConfig
		}
		this.initMilestones();
	}
	initMilestones() {
		let milestones = [this.init, this.initCytoscape, this.initBrowseCtrl, this.initEvent];
		this.ms = new Milestone(...milestones);
		this.afterMilestone(this.init, () => {
			this.startInitCytoscape();
		});
		this.afterMilestone(this.initCytoscape, () => {
			this.startInitBrowseCtrl();
		});
		this.afterMilestone(this.initBrowseCtrl, () => {
			this.startInitEvent();
		});
		this.afterMilestone(this.initEvent, () => {
			//donothing
		});
	}
	finishMilestone(name) {
		this.ms.finish(name);
	}
	afterMilestone(name, action) {
		this.ms.after(name, () => {
			action();
		});
	}
	startInitCytoscape() {
		this.setState({
			milestone: this.initCytoscape
		}, () => {
			this.finishMilestone(this.initCytoscape);
		});
	}
	startInitBrowseCtrl() {
		this.browseCtrl = new BrowseCtrl(this.refs.cyPanel, this.refs.editPanel, this.refs.toolbar);
	}
	get init() {
		return 'init';
	}
	get initCytoscape() {
		return 'initCytoscape';
	}
	get initBrowseCtrl() {
		return 'initBrowseCtrl';
	}
	get initEvent() {
		return 'initEvent';
	}
	componentDidMount() {
		this.finishMilestone(this.init);
	}
	componentWillUpdate() {
		return _.includes([this.init, this.initCytoscape], this.state.milestone);
	}
	render() {
		if (this.state.milestone == this.init) {
			return this.renderInit();
		} else {
			return this.renderInitCytoscape();
		}
	}
	renderInit() {
		return <div > < /div>;
	}
	renderInitCytoscape() {
		return <div className = 'class-browse' >
			< div className = 'toolbar' >
			< Toolbar ref = 'toolbar' > < /Toolbar> < /div > < div className = 'content' >
			< div className = 'left-panel' >
			< EditPanel ref = 'editPanel' > < /EditPanel> < /div > < div className = 'main-panel' >
			< CyPanel ref = 'cyPanel' > < /CyPanel> < /div > < /div > < /div > ;
	}
}

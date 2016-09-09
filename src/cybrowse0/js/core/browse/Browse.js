import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import assert from 'assert';
import _ from 'lodash';
import {
	Milestone
} from '../../lib';
import BrowseView from './BrowseView';
export default class Browse extends Component {
	constructor(props) {
		super(props);
		this.initState();
		this.initMilestones();
	}
	initState() {
		this.state = {
			milestone: this.init
		};
	}
	finishMilestone(name) {
		this.ms.finish(name);
	}
	afterMilestone(name, action) {
		this.ms.after(name, () => {
			action();
		});
	}
	get init() {
		return 'init';
	}
	get loadConfig() {
		return 'loadConfig';
	}
	get initView() {
		return 'initView';
	}
	get initCytoscape() {
		return 'initCytoscape';
	}
	initMilestones() {
		let milestones = [this.init, this.loadConfig, this.initView];
		this.ms = new Milestone(...milestones);
		this.afterMilestone(this.init, () => {
			this.startLoadConfig();
		});
		this.afterMilestone(this.loadConfig, () => {
			this.startInitView();
		});
		this.afterMilestone(this.initView, () => {
			// empty;
		});
	}
	componentDidMount() {
		this.finishMilestone(this.init);
	}
	startLoadConfig() {
		$.getJSON('data/data.json').then((data) => {
			this.setState({
				defaultConfig: data,
				milestone: this.loadConfig
			}, () => {
				this.finishMilestone(this.loadConfig);
			});
		}, () => {
			console.log('loadConfig error');
		});
	}
	startInitView() {
		this.setState({
			milestone: this.initView
		}, () => {
			this.finishMilestone(this.initView);
		});
	}
	render() {
		if (this.state.milestone === this.init || this.state.milestone === this.loadConfig) {
			return <div > < /div>
		} else if (this.state.milestone === this.initView) {
			return <BrowseView defaultConfig = {
				this.state.defaultConfig
			} > < /BrowseView>
		}
	}
}

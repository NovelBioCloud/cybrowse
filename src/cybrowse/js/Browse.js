import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import context, {
	contextType
} from './context';
import EditPanel from './EditPanel';
import CyPanel from './CyPanel';
import CyTool from './CyTool';
import $ from 'jquery';
import Toolbar from './Toolbar';
import {
	EventEmitter
} from 'fbemitter';
export default class Browse extends Component {
	constructor(props) {
		super(props);
		this.initState();
		this.events = new EventEmitter();
	}
	initState() {
		this.state = {
			stage: 'init'
		};
	}
	componentDidMount() {
		this.addLoadConfigListener();
		this.addInitCytoscapeListener();
		this.startInit();
	}
	startInit() {
		this.events.emit('init');
	}
	addLoadConfigListener() {
		let eventToken = this.events.addListener('init', () => {
			this.loadConfig();
			eventToken.remove();
		});
	}
	loadConfig() {
		$.get('data/config.json').then((data) => {
			this.setState({
				stage: 'loadConfig'
			}, () => {
				this.events.emit('loadConfig');
			});
		}, () => {
			console.log('loadConfig error');
		});
	}
	addInitCytoscapeListener() {
		let eventToken = this.events.addListener('loadConfig', () => {
			this.initCytoscape();
			eventToken.remove();
		});
	}
	initCytoscape() {
		this.cyTool = new CyTool({
			editPanel: this.refs.editPanel,
			cyPanel: this.refs.cyPanel,
		});
		this.refs.toolbar.initCyTool(this.cyTool);
	}

	getChildContext() {
		return Object.assign({
			getCyTool: () => {
				return this.refs.view
			}
		}, context);
	}
	render1() {
		return <div >< /div>
	}
	render2() {
		return <div className = 'class-browse' >
			< div className = 'toolbar' >
				< Toolbar ref = 'toolbar' > < /Toolbar>
			< /div >
			< div className = 'content' >
				< div className = 'left-panel' >
					< EditPanel ref = 'editPanel' > < /EditPanel>
				< /div >
				< div className = 'main-panel' >
					< CyPanel ref = 'cyPanel' > < /CyPanel>
				< /div >
			< /div >
		< /div > ;
	}
	render() {
		if (this.state.stage=='init') {
			return this.render1();
		} else {
			return this.render2();
		}
	}

};
Browse.childContextTypes = Object.assign({
	getCyTool: React.PropTypes.func.isRequired
}, contextType);
Browse.defaultProps = {}

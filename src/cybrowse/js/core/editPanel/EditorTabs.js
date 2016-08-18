import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {
	cyan500
} from 'material-ui';
import {
	Tabs,
	Tab
} from 'material-ui/Tabs';

import NodeEditor from './NodeEditor';
import EdgeEditor from './EdgeEditor';
import NetworkEditor from './NetworkEditor';

export default class EditorTabs extends Component {
	constructor(props) {
		super(props);
	}
	getChildContext() {
		return {
			muiTheme: getMuiTheme({
				palette: {
					textColor: cyan500,
				},
				appBar: {
					height: 50,
				},
			}),
		};
	}
	getLayoutOption() {
		return this.refs.networkPanel.getLayoutOption();
	}
	render() {
		return <div >
			<Tabs>
		    <Tab label="节点" >
		      <NodeEditor ref='nodeEditor'/>
		    </Tab>
		    <Tab label="连线" >
		      <EdgeEditor ref='edgeEditor'/>
		    </Tab>
		    <Tab label="网络" >
		      <NetworkEditor ref='networkEditor'/>
		    </Tab>
			</Tabs>
		< /div > ;
	}
}
EditorTabs.contextTypes = {
	cytoscape: React.PropTypes.any
}
EditorTabs.childContextTypes = {
	muiTheme: React.PropTypes.any,
	cytoscape: React.PropTypes.any
}
export default EditorTabs;

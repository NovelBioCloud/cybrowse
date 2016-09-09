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
import store from '../../proc/store';

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
		      {this.renderNodeEditor()}
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
	renderNodeEditor(){
		return <NodeEditor ref='nodeEditor'/>;
	}
}
EditorTabs.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
}
export default EditorTabs;

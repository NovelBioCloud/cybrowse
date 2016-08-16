import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import {
	contextType
} from './context';
import layoutOptions from './layoutOptions';
import {
	EditTabPanel
} from './EditTabPanel'

class EditPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'red'
		};
	}

	render() {
		return <div className = 'class-edit-panel' >
			< EditTabPanel > < /EditTabPanel> < /div > ;
	}

	initCytoscape(cy, config) {
		this.cy = cy;
		this.config = config;
	}
	getChildContext() {
		return {
			getCytoscape: () => {
				return this.cy;
			}
		};
	}
}
EditPanel.childContextTypes = {
	getCytoscape: React.PropTypes.func.isRequired
};
export default EditPanel;

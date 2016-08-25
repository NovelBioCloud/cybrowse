import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import NodeEditorColor from './nodeEditorColor';

export default class NodeEditor extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div >
			<NodeEditorColor/>
		< /div>;
	}
}
NodeEditor.contextTypes = {
	cytoscapeMgr: React.PropTypes.object.isRequired
}

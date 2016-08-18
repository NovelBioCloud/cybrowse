import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import NodeEditorColor from './NodeEditorColor';

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

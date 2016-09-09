import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import EdgeEditorColor from './EdgeEditorColor';
export default class EdgeEditor extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>
			<EdgeEditorColor/>
		</div>
	}

}

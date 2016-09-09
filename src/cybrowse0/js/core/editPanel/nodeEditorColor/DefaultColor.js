import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Immutable from 'immutable';
import ColorPicker from 'react-color-picker';
import {
	SketchPicker
} from 'react-color';
export default class DefaultColor extends Component {

	changeDefaultColor(value) {
		let nodeStyleProvider = this.context.cytoscapeMgr.getNodeStyleProvider();
		nodeStyleProvider.update({
			"background-color": value||"#f2f2f2"
		});
		this.forceUpdate();
	}

	render() {
		let nodeStyleProvider = this.context.cytoscapeMgr.getNodeStyleProvider();
		let defaultColor = nodeStyleProvider.getStyle()["background-color"];
		return <div > default:<input type="color" value={defaultColor} onChange={(event)=>{
			this.changeDefaultColor(event.target.value);
			event.preventDefault();
		}}/> < /div>;
	}

}
DefaultColor.contextTypes = {
	cytoscapeMgr: React.PropTypes.object.isRequired
}

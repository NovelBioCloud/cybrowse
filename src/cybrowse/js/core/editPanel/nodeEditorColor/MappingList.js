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
import Mapping from './Mapping';
export default class MappingList extends Component {

	render() {
		let {
			mappingStore
		} = this.props;
		let styleProviderMap = mappingStore.getStyleProviderMap();
		let mappingComponents = [...styleProviderMap].map(([ name,provider] ) => {
			return <Mapping key={name} name={name} provider={provider}></Mapping>;
		});
		return <div > {mappingComponents} < /div>;
	}
	componentDidMount() {
		setInterval(() => {
			this.forceUpdate();
		}, 3000);
	}
}

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
import DefaultColor from './DefaultColor';
import Column from './Column';
import Type from './Type';
import MappingList from './MappingList';
import Mapping from './Mapping';
import {
	MappingStore,
	StyleProvider
} from '../../style';
// import css from 'react-color-picker/index.css';

const styles = {
	customWidth: {
		width: "80%"
	}
}
export default class NodeEditorColor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultColor: "#F0F0F0",
			mappingType: 2
		};
	}
	handleChange(value) {
		this.setState({
			mappingType: value,
		});
	}
	getType() {
		return 'node background-color';
	}
	render() {
		let mappingStore = this.getMappingStore();
		return <div >
			< div > 节点颜色设置 < /div>
			< DefaultColor mappingStore={mappingStore}/ >
			< Column ref="column" mappingStore={mappingStore} onChange={()=>{}}/ >
			< Type ref="type" mappingStore={mappingStore} onChange={()=>{}}/ >
			< MappingList ref="mappingList" mappingStore={mappingStore}/>
		< /div >
	}
	getMappingStore() {
		let mappingStore = this.context.cytoscapeMgr.getMappingStore(this.getType());
		if (!mappingStore) {
			mappingStore = this.createStore();
			this.context.cytoscapeMgr.getMappingStoreMap().set(this.getType(), mappingStore);
		}
		return mappingStore;
	}
	createStore(){
		console.log("=====");
		let store = new MappingStore(this.context.cytoscapeMgr);
		const factory = (value) => {
			return new StyleProvider(`node[background-color="${value}"]`, {}, value);
		};
		store.setStyleProviderFactory(factory);
		return store;
	}
}
NodeEditorColor.contextTypes = {
	cytoscapeMgr: React.PropTypes.object.isRequired
}
NodeEditorColor.childContextTypes = {
	cytoscapeMgr: React.PropTypes.object
}

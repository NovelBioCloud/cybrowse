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
import _ from 'lodash';
export default class Type extends Component {


		render() {
	    let { mappingStore } = this.props;
	    let columns = mappingStore.getTypes();
	    columns = _.concat([""], columns);
	    columns = columns.map((item)=>{
	      return <option key={item} value={item}>{item}</option>;
	    });
			return <div >
	      <select onChange={(event)=>{
	        this.changeType(event.target.value);
	      }} value={mappingStore.getType()}>
	        {columns}
	      </select>
	    < /div>;
		}
	  changeType(value) {
	    let { mappingStore } = this.props;
	    mappingStore.setType(value);
	    this.forceUpdate();
	  }
	  componentDidMount() {
	    setInterval(()=>{
	      this.forceUpdate();
	    },3000);
	  }
	  componentwillUnmount() {

	  }

}

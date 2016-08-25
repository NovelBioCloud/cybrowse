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

export default class Column extends Component {

	render() {
    let { mappingStore } = this.props;
    let columns = mappingStore.getColumns();
    columns = _.concat([""], columns);
    columns = columns.map((item)=>{
      return <option key={item} value={item}>{item}</option>;
    })
		return <div >
      <select onChange={(event)=>{
        this.changeColumn(event.target.value);
      }} value={mappingStore.getColumn()}>
        {columns}
      </select>
    < /div>;
	}
  changeColumn(value) {
    let { mappingStore } = this.props;
    mappingStore.setColumn(value);
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
Column.contextTypes = {
  cytoscapeMgr: React.PropTypes.object.isRequired
}

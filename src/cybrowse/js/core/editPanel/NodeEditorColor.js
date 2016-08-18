import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
const styles = {
	customWidth: {
    width:"80%"
	}
}
export default class NodeEditorColor extends Component {
	constructor(props) {
		super(props);
		this.state = {
      defaultColor: "#444444",
			mappingType: 0
		};
	}
  handleChange( value) {
  	this.setState({
  		mappingType: value,
  		mappingField: "",
  	});
  }
  changeDefaultColor(value){
    console.log(value);
    this.setState({
      defaultColor:value
    });
  }
	render() {
    return <div >
      <div>节点颜色设置</div>
      <div>默认：<input type="color" value={this.state.defaultColor} /></div>
      <div>自定义设置: </div>
      <div>
        <SelectField
          value={this.state.mappingType}
          onChange={(event,index,value)=>{this.handleChange(value)}}
          style={styles.customWidth}
          autoWidth={true}
          >
          <MenuItem value={0} primaryText="未设置" />
          <MenuItem value={1} primaryText="直接传值" />
          <MenuItem value={2} primaryText="匹配方式传值" />
        </SelectField>
      </div>
      <div>
        <Mapping type={this.state.mappingType} field={this.state.mappingField}></Mapping>
      </div>
      <div>单个节点设置</div>
     < /div>
	}
}

class Mapping extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div>{this.props.type}{this.props.field}</div>
  }
}

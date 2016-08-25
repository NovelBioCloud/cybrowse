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
export default class Mapping extends Component {

	render() {
		let { name, provider } = this.props;
		let value = provider.getStyle()["background-color"];
		var styles = {
			unset: {},
			setted: {
				width: "0px",
				visibility: "hidden"
			}
		};
		let displayStyle = value? styles.unset:styles.setted;
		return <div>{name}:
				{ !value && < span > 未设置 < /span> }
				{ <input ref='colorPicker' style={displayStyle} value={value||"#000000"} type="color" onChange={(event)=>{
						this.changeMapping(event.target.value, provider);
						event.preventDefault();
					}}/>
				}
				{ !value && <button type="button" onClick={()=>{
						let evt = document.createEvent('Event');
						evt.initEvent('click',true,true);
						console.log(evt);
					 	this.refs.colorPicker.dispatchEvent(evt);
						console.log(this.refs.colorPicker);
					}}>设置</button>
				}
				{ value && <button type="button" onClick={()=>{
					 delete provider.getStyle()["background-color"];
						this.forceUpdate();
					}}>刪除</button>
				}
		</div>
	}
	changeMapping(value, provider) {
		provider.update({
			"background-color": value
		});
		this.forceUpdate();
	}

}

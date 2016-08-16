import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import {
	contextType
} from './context';
import layoutOptions from './layoutOptions';
import {
	EditTabPanel
} from './EditTabPanel'

class EditPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'red'
		};
	}
	renderScriptConsole(){
		return  < textArea ref = 'textArea'
		className = 'script-editor'
		defaultValue = ''
		placeholder = 'press ctrl+Entry to run script '
		onKeyDown = {
			(event) => {
				this.onKeyDown(event);
			}
		}
		/>;
	}
	/**=========================================================================**/
	renderNodeSelector(){
		return < input ref = 'nodeSelector' type = 'text'/>;
	}
	renderNodeColorEditor(){
		return  < input type = 'color' ref = 'nodeColor' />;
	}
	renderNodeShapeEditor(){
		let options = ['rectangle', 'roundrectangle', 'ellipse', 'triangle', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'star', 'diamond', 'vee', 'rhomboid', 'polygon']
		let optionsView = options.map((item)=>{
			return <option key={item} value={item}>{item}</option>
		});
		return <select ref = 'nodeShape'>
		  {optionsView}
		</select>;
	}
	renderNodeWidthEditor() {
		return <input type = 'number'
		ref = 'nodeWidth'
		min = '20'
		max = '70' / > ;
	}
	renderNodeHeightEditor() {
		return <input type = 'number'
		ref = 'nodeHeight'
		min = '20'
		max = '70' / > ;
	}
	/**===========================================================================**/

	/**=========================================================================**/
	renderEdgeSelector(){
		return < input ref = 'edgeSelector' type = 'text'/>;
	}
	renderEdgeLineStyleEditor(){
		let options = ['solid', 'dotted', 'dashed' ];
		let optionsView = options.map((item)=>{
			return <option key={item} value={item}>{item}</option>
		});
		return <select ref = 'edgeLineStyle'>
			{optionsView}
		</select>;
	}
	renderEdgeLineColorEditor(){
		return < input type = 'color' ref = 'edgeLineColor' />;
	}
	renderEdgeTargetArrowShapeEditor(){
		let options = ['tee', 'triangle', 'triangle-tee', 'triangle-backcurve', 'square', 'circle', 'diamond', 'none'];
		let optionsView = options.map((item)=>{
			return <option key={item} value={item}>{item}</option>
		});
		return <select ref = 'edgeTargetArrowShape'>
			{optionsView}
		</select>;
	}
	renderLayoutEditor() {
		let optionsView = [...layoutOptions.keys()].map((item)=>{
			return <option key={item} value={item}>{item}</option>
		});
		return <select ref = 'layoutEditor' defaultValue='concentric' onChange={()=>{
			this.resetLayout();
		}}>
			{optionsView}
		</select>;
	}
	resetLayout() {
		this.cy.layout(layoutOptions.get(this.refs.layoutEditor.value));
	}
	getLayoutType(){
		return this.refs.layoutEditor.value;
	}
	getDefaultStyle(){
		return {

		};
	}
	/**===========================================================================**/
	render() {
		return <div className = 'class-edit-panel' >
			< div > {this.renderScriptConsole()} < /div >
			<fieldset>
				<legend>布局</legend>
				< div > 节点：{this.renderLayoutEditor()}	< /div >
			</fieldset>
			<fieldset>
				<legend>节点设置</legend>
				< div > 节点：{this.renderNodeSelector()}	< /div >
				< div > 形状：{this.renderNodeShapeEditor()} < /div >
				< div > 颜色：{this.renderNodeColorEditor()} < /div >
				< div > 宽度：{this.renderNodeWidthEditor()} < /div >
				< div > 高度：{this.renderNodeHeightEditor()} < /div >
				< div > < button onClick = {
					(event) => {
						this.updateNodes();
					}
				} > 设置节点 < /button></div >
			</fieldset>
			<fieldset>
				<legend>连线设置</legend>
				< div > 节点：{this.renderEdgeSelector()}	< /div >
				< div > 形状：{this.renderEdgeLineStyleEditor()} < /div >
				< div > 颜色：{this.renderEdgeLineColorEditor()} < /div >
				< div > 箭头：{this.renderEdgeTargetArrowShapeEditor()} < /div >
				< div > < button onClick = {
					(event) => {
						this.updateEdges();
					}
				} > 设置连线 < /button></div >
			</fieldset>
		< /div > ;
	}
	updateNodes() {
		let node = this.cy.style()
			.selector(this.refs.nodeSelector.value || 'node');
		let color = this.refs.nodeColor.value;
		if (color) {
			node.style('background-color', color);
		}
		let width = this.refs.nodeWidth.value;
		if (width) {
			node.style('width', width);
		}
		let height = this.refs.nodeHeight.value;
		if (height) {
			node.style('height', height);
		}
		let shape = this.refs.nodeShape.value;
		if (shape) {
			node.style('shape', shape);
		}
		node.style('content', 'data(id)');
		node.update();
	}
	updateEdges() {
		let edges = this.cy.style()
			.selector(this.refs.edgeSelector.value || 'edge');
		let lineStyle = this.refs.edgeLineStyle.value;
		if (lineStyle) {
			edges.style('line-style', lineStyle);
		}
		let color = this.refs.edgeLineColor.value;
		if (color) {
			edges.style('line-color', color);
		}
		let targetArrowShape = this.refs.edgeTargetArrowShape.value;
		if (targetArrowShape) {
			console.log(targetArrowShape);

			edges.style('target-arrow-shape', targetArrowShape);
			edges.style('target-arrow-fill', 'filled');
			edges.style('target-arrow-color', '#9dbaea');
		}
		edges.update();
	}
	onKeyDown(event) {
		if (event.ctrlKey == true && event.keyCode == 13) {
			event.preventDefault();
			this.runScript();
		}
	}
	runScript() {
		try {
			let cy = this.cy;
			eval(this.refs.textArea.value);
		} catch (e) {
			console.log(e);
		}
	}
	initCytoscape(cy, config) {
		this.cy = cy;
		this.config = config;
	}
	componentDidMount() {}
	reloadData(data) {}
	clearData() {

	}
	getChildContext() {
		return {
			getCytoscape: () => {
				return this.cy;
			}
		};
	}
}
EditPanel.childContextTypes = {
	getCytoscape: React.PropTypes.func.isRequired
};
export default EditPanel;

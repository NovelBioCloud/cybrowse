import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import cytoscape from 'cytoscape';
import {
	contextType
} from './context';
import createCytoscape from './createCytoscape';
export default class CyPanel extends Component {
	componentDidMount() {}
	initCytoscape() {
		this.cy = createCytoscape(this.refs.cyContainer);
	}
	getCytoscape() {
		return this.cy;
	}
	render() {
		return <div className = 'class-cy-panel' >
			< div ref = 'cyContainer'
		className = 'cy-panel-cyContainer' > < /div> < /div > ;
	}
	clearData() {
		this.cy.remove(this.cy.elements());
	}
	reloadData(data) {
		this.cy.remove(this.cy.elements());
		this.cy.add(data);
		let options = {
			name: 'concentric',
			fit: true, // whether to fit the viewport to the graph
			padding: 30, // the padding on fit
			startAngle: 3 / 2 * Math.PI, // where nodes start in radians
			sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
			clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
			equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
			minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
			boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
			height: undefined, // height of layout area (overrides container height)
			width: undefined, // width of layout area (overrides container width)
			concentric: function (node) { // returns numeric value for each node, placing higher nodes in levels towards the centre
				return node.degree();
			},
			levelWidth: function (nodes) { // the variation of concentric values in each level
				return nodes.maxDegree() / 4;
			},
			animate: false, // whether to transition the node positions
			animationDuration: 500, // duration of animation in ms if enabled
			animationEasing: undefined, // easing of animation if enabled
			ready: undefined, // callback on layoutready
			stop: undefined // callback on layoutstop
		};
		// this.cy.layout(options);
	}
}

CyPanel.contextTypes = contextType;

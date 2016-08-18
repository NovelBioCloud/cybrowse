import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import cytoscape from 'cytoscape';
import Provider from '../cytoscape-util';
export default class CyPanel extends Component {
	componentDidMount() {}
	initCytoscape() {
		this.refs.view.initCytoscape();
	}
	getCytoscape() {
		return this.refs.view.getCytoscape();
	}
	render() {
		return <CyPanelView ref = 'view' / > ;
	}
	clearData() {
		this.refs.view.clearData();
	}
	reloadData(data) {
		this.refs.view.reloadData(data);
	}
}
class CyPanelView extends Component {
	initCytoscape() {
		this.cyProvider = new Provider(this.refs.cyContainer, {}, {});
		this.cy = this.cyProvider.getCytoscape();
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
	}
}

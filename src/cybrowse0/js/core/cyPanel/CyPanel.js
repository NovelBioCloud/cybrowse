import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import cytoscape from 'cytoscape';
import Provider from '../cytoscape-util';

export default class CyPanel extends Component {
	getCytoscape() {
		return this.cy;
	}
	getContainer() {
		return this.refs.container;
	}
	initCytoscapeMgr(cytoscapeMgr){
		this.cytoscapeMgr = cytoscapeMgr;
		this.cy = this.cytoscapeMgr.getCytoscape();
	}
	getCytoscapeMgr(){
		return this.cytoscapeMgr;
	}
	render() {
		return <div className = 'class-cy-panel' >
			< div ref = 'container' className = 'cy-panel-cyContainer' >
			< /div>
		< /div > ;
	}
	clearData() {
		this.cy.remove(this.cy.elements());
	}
	reloadData(data) {
		this.cy.remove(this.cy.elements());
		this.cy.add(data);
	}
}

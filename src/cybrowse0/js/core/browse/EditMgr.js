import React from 'react';
export default class EditMgr {
	constructor(editPanel, cyPanel) {
		this.cyPanel = cyPanel;
		this.editPanel = editPanel;
		this.editPanel.initCytoscapeMgr(this.cyPanel.getCytoscapeMgr());
		this.cytoscapeMgr = this.cyPanel.getCytoscapeMgr();
	}
	getCytoscape() {
		return this.cyPanel.getCytoscape();
	}
	reloadData(data) {
		this.cytoscapeMgr.reloadData(data);
	}
	clearData() {
		this.editPanel.clearData();
		this.cyPanel.clearData();
	}
	getLayoutType() {
		return this.editPanel.getLayoutType();
	}
	getCytoscapeMgr(){
		return this.cyPanel.getCytoscapeMgr();
	}
}

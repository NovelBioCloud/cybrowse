import React from 'react';
export default class CyTool {
	constructor(editPanel, cyPanel) {
		this.editPanel = editPanel;
		this.cyPanel = cyPanel;
		this.editPanel.initCytoscape(this.cyPanel.getCytoscape());
	}
	getCytoscape() {
		return this.cyPanel.getCytoscape();
	}
	reloadData(data) {
		this.editPanel.reloadData(data);
		this.cyPanel.reloadData(data);
	}
	clearData() {
		this.editPanel.clearData();
		this.cyPanel.clearData();
	}
	getLayoutType() {
		return this.editPanel.getLayoutType();
	}
}

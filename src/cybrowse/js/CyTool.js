import EditPanel from './EditPanel';
import CyPanel from './CyPanel';
import React from 'react';
import layoutOptions from './layoutOptions';
export default class CyTool {
	constructor({
		editPanel,
		cyPanel
	}) {
		this.editPanel = editPanel;
		this.cyPanel = cyPanel;
		this.cyPanel.initCytoscape();
		this.editPanel.initCytoscape(this.cyPanel.getCytoscape());
	}
	getCytoscape() {
		return this.cyPanel.getCytoscape();
	}
	reloadData(data) {
		this.editPanel.reloadData(data);
		this.cyPanel.reloadData(data);
		let layoutOption = layoutOptions.get(this.editPanel.getLayoutType());
		console.log(layoutOption);
		this.cyPanel.getCytoscape().layout(layoutOption);
	}
	clearData() {
		this.editPanel.clearData();
		this.cyPanel.clearData();
	}
	getLayoutType() {
		return this.editPanel.getLayoutType();
	}
}

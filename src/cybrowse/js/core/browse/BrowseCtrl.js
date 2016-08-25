import React from 'react';
import EditMgr from './EditMgr';
import ToolbarMgr from './ToolbarMgr';
import CytoscapeMgr from '../cytoscapeMgr';

export default class BrowseCtrl {
	constructor(cyPanel, editPanel, toolbar) {
		this.editPanel = editPanel;
		this.cyPanel = cyPanel;
		this.toolbar = toolbar;
		this.cytoscapeMgr = new CytoscapeMgr(cyPanel.getContainer());
		this.cyPanel.initCytoscapeMgr(this.cytoscapeMgr);
		this.editMgr = new EditMgr(this.editPanel, this.cyPanel);
		this.toolbarMgr = new ToolbarMgr(this.toolbar, this.editMgr);
	}
	getCytoscape() {
		return this.cyPanel.getCytoscape();
	}
	reloadData(data) {
		cytoscapeMgr.reloadData(data);

	}
	clearData() {
		this.editPanel.clearData();
		this.cyPanel.clearData();
	}
	getLayoutType() {
		return this.editPanel.getLayoutType();
	}
}

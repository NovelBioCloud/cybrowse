import React from 'react';
export default class ToolbarMgr {
	constructor(toolbar, editMgr) {
		this.editMgr = editMgr;
		this.toolbar = toolbar;
		this.toolbar.initEditMgr(editMgr);
	}
	getCytoscape() {
		return this.editMgr.getCytoscape();
	}
}

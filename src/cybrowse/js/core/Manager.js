import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {
	CybrowseManager,
	CytoscapeManager,
	ConfigManager,
	SpecificEditorManager
} from './manager'

export default function Manager() {
	let _this = this
		//** manager **//
	let configManager
	let cybrowseManager
	let cytoscapeManager
	let specificEditorManager

	this.init = _.bind(init)
	this.getCytoscapeManager = () => cytoscapeManager
	this.getConfigManager = () => configManager
	this.getCybrowseManager = () => cybrowseManager
	this.getSpecificEditorManager = () => specificEditorManager

	function init() {
		data_init()
	}

	function data_init() {
		cytoscapeManager = new CytoscapeManager()
		configManager = new ConfigManager()
		cybrowseManager = new CybrowseManager()
		specificEditorManager = new SpecificEditorManager()
		specificEditorManager.init({})
		cytoscapeManager.init({
			configManager
		})
		configManager.init({
			cytoscapeManager
		})
		cybrowseManager.init({
			cytoscapeManager: cytoscapeManager,
			configManager: configManager
		})
	}

}

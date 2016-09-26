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
	DataManager
} from './manager'

export default function Manager() {
	let _this = this
		//** manager **//
	let configManager
	let cybrowseManager
	let cytoscapeManager
	this.init = _.bind(init)

	this.getCytoscapeManager = () => cytoscapeManager
	this.getConfigManager = () => configManager
	this.getCybrowseManager = () => cybrowseManager

	function init() {
		data_init()
	}

	function data_init() {
		configManager = new ConfigManager()
		configManager.init()
		cytoscapeManager = new CytoscapeManager()
		cybrowseManager = new CybrowseManager()
		cybrowseManager.init({
			cytoscapeManager: cytoscapeManager,
			configManager: configManager
		})
	}

}

import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'
import CybrowseModel from '../model/CybrowseModel'

export default function CybrowseManager() {
	let cybrowseData
	let cytoscapeManager
	let configManager
	this.init = function (props, cb) {
		init(props, cb)
	}
	this.getData = function () {
		return cybrowseData
	}

	function init(props, cb) {
		cytoscapeManager = props.cytoscapeManager
		configManager = props.configManager
		cybrowseData = new CybrowseModel()
	}

	function load(data) {
		cybrowseData = data
	}

	function loadLocalStorage() {
		try {
			data = JSON.parse(localStorage.getItem("cybrowse-data"))
			cybrowseData = data
		} catch (e) {
			cybrowseData = null
		}
		if (cybrowseData == null) {}
	}

	function save() {
		let cytoscape = cytoscapeManager.getCytoscape(),
			configData = configManager.getData()
		if (cytoscapeManager && editorManager) {
			localStorage.setItem("cybrowse-data", JSON.stringify({
				defaultStyle: "",
				customStyle: "",
				mappingStyle: "",
				specificStyle: "",
				layout: "",
				cybrowse: "",
			}))
		} else {
			throw new Error()
		}
	}
}

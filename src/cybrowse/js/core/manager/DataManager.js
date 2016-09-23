import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'
import CybrowseModel from '../model/CybrowseModel'


export default function DataManager() {
	let data
	let props, context
	let cytoscapeManagerThunk, editorManagerThunk
	let globalConfig, trunkConfig, mappingConfig, specificConfig
	let base = {
		init,
		load,
		save,
		getData,
		getProperties,
		getValuesByProperty,
		onCytoscapeManagerThunkCall,
		onEditorManagerThunkCall
	}
	this.init = init
	this.load = load
	this.save = save
	this.getData = getData
	this.getProperties = getProperties
	this.getValuesByProperty = getValuesByProperty
	this.onCytoscapeManagerThunkCall = onCytoscapeManagerThunkCall
	this.onEditorManagerThunkCall = onEditorManagerThunkCall
		/**base*/
	function init(_props, _context) {
		props = _props
		context = _context
		try {
			let cybrowseData = JSON.parse(localStorage.getItem("cybrowse-data"))
			data = cybrowseData
		} catch (e) {
			data = null
		}
		if (data == null) {
			data = new CybrowseModel()
		}
	}

	function load(_data) {
		data = _data
	}

	function save(data) {
		try {
			service_save(data)
		} catch (e) {
			toastr.error('保存失败')
		}
	}

	function getData() {
		return data
	}

	function getProperties() {
		if (!service_validate()) {
			return []
		} else {
			let propertySet = new Set()
			data.cytoscape.elements.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
				Object.keys(item.data).forEach((property) => {
					propertySet.add(property)
				})
			})
			return [...propertySet]
		}
	}

	function getValuesByProperty(property) {
		if (!service_validate() || !property || property === '') {
			return []
		} else {
			let valueSet = new Set()
			data.cytoscape.elements.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
				// 为了提高效率，此处假设外部传入的property属性一定是存在的
				// if (_.includes(_.keys(item.data), property)) {
				// 	valueSet.add(item[property] || "")
				// }
				valueSet.add(item.data[property] || "")
			})
			return [...valueSet]
		}
	}

	function onCytoscapeManagerThunkCall(_cytoscapeManagerThunk) {
		cytoscapeManagerThunk = _cytoscapeManagerThunk
	}

	function onEditorManagerThunkCall(editorManagerThunk) {
		editorManagerThunk = _editorManagerThunk
	}
	/*service*/
	function service_save() {
		let cytoscapeManager = service_getCytoscapeManager(),
			editorManager = service_editorManager()
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
	/*functional*/
	function service_validate() {
		return (data && data.cytoscape && data.cytoscape.elements)
	}

	function service_getCytoscapeManager() {
		let cytoscapeManager
		if (cytoscapeManagerThunk) {
			cytoscapeManager = cytoscapeManagerThunk()
		}
		if (!cytoscapeManager) {
			throw new Error()
		}
		return cytoscapeManager
	}

	function service_getEditorManager() {
		let editorManager
		if (editorManagerThunk) {
			editorManager = editorManagerThunk()
		}
		if (!editorManager) {
			throw new Error()
		}
		return editorManager
	}
}

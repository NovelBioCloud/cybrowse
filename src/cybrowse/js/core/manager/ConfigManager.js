import _ from 'lodash'
import ConfigModel from '../model/ConfigModel'
export default function ConfigManager() {

	let config
	this.init = init
	this.getData = getData
	this.save = save
	this.updateDefaultLayout = updateDefaultLayout
	this.updateDefaultStyle = updateDefaultStyle
	this.loadLocalStorageData = loadLocalStorageData
	this.getProperties = getProperties
	this.getValuesByProperty = getValuesByProperty
		/** base **/
	function init() {
		service_loadLocalStorageData()
	}

	function getData() {
		return config || new ConfigModel()
	}

	function updateDefaultLayout(defaultLayout) {
		config.defaultLayout = defaultLayout
	}

	function updateDefaultStyle(defaultStyle) {
		config.defaultStyle = defaultStyle
	}

	function save() {
		service_save()
	}

	function loadLocalStorageData() {
		service_loadLocalStorageData()
	}

	function getProperties() {
		if (!cytoscapeManager) {
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
		if (!cytoscapeManager || !property || property === '') {
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

	/** service **/
	function service_loadLocalStorageData() {
		let _config
		try {
			let configString = localStorage.getItem('cybrowse-data-lasted')
			if (configString) {
				_config = JSON.parse(configString)
			}
		} catch (e) {
			_config = new ConfigModel()
		}
		config = _config
	}

	function service_save() {
		if (cytoscapeManager) {
			let dataString = JSON.stringify({
				defaultStyle: "",
				customStyle: "",
				mappingStyle: "",
				specificStyle: "",
				layout: "",
				cybrowse: ""
			})
			localStorage.setItem("cybrowse-data-lasted", dataString)
			localStorage.setItem("cybrowse-data-" + Date.now(), dataString)
		} else {
			throw new Error()
		}
	}
}

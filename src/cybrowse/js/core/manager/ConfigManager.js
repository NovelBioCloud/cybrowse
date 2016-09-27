import _ from 'lodash'
import ConfigModel from '../model/ConfigModel'
import configs from '../common/configs'
export default function ConfigManager() {

	let config
	let cytoscapeManager
	this.init = init
	this.getData = getData
	this.save = save
	this.updateDefaultLayout = updateDefaultLayout
	this.updateDefaultStyle = updateDefaultStyle
	this.loadLocalStorageData = loadLocalStorageData
	this.getProperties = getProperties
	this.getValuesByProperty = getValuesByProperty
	this.clearLocalData = clearLocalData
	this.load = load
	this.getStyle = getStyle
	this.getNodes = getNodes
	this.getEdges = getEdges
	this.getElements = getElements
	this.updateNodeMappingStyle = updateNodeMappingStyle
	this.updateNodeTrunkStyle = updateNodeTrunkStyle
	this.emitEvent = emitEvent

	/** base **/
	function init(props) {
		cytoscapeManager = props.cytoscapeManager
		service_loadLocalStorageData()
	}

	function emitEvent(data) {
		let type = data.type
		console.log(data)
		if (_.startsWith(type, 'node.style.mapping.data')) {
			reducer_nodeStyleMappingData(data)
		} else if (_.startsWith(type, 'node.style.mapping')) {
			reducer_nodeStyleMapping(data)
		}
	}

	function getData() {
		config = config || new ConfigModel()
		return config
	}

	function getStyle() {
		return service_getStyle()
	}

	function getNodes() {
		return config.data.cytoscape.elements.nodes || []
	}

	function getEdges() {
		return config.data.cytoscape.elements.edges || []
	}

	function getElements() {
		return _.concat(config.data.cytoscape.elements.nodes, config.data.cytoscape.elements.edges)
	}

	function updateNodeTrunkStyle(styleName, styleValue) {
		data_updateNodeTrunkStyle(styleName, styleValue)
	}

	function load(data) {
		data_load(data)
	}

	function updateNodeMappingStyle(styleName, propertyName, propertyValue, styleValue) {
		data_updateNodeMappingStyle(styleName, propertyName, propertyValue, styleValue)
	}

	function updateDefaultLayout(defaultLayout) {
		config.defaultLayout = defaultLayout
	}

	function updateDefaultStyle(styleName) {
		let defaultStyle = _.find(configs.style, {
			name: styleName
		})
		defaultStyle = defaultStyle || configs.style[0]
		config.defaultStyle = _.cloneDeep(defaultStyle)
		config.style.node.trunk = {}
	}

	function save() {
		service_save()
	}

	function clearLocalData() {
		localStorage.removeItem('cybrowse-data-lasted')
	}

	function loadLocalStorageData() {
		service_loadLocalStorageData()
	}

	function getProperties() {
		if (!config.data || !config.data.cytoscape) {
			return []
		} else {
			let propertySet = new Set()
			config.data.cytoscape.elements.nodes.filter((item) => {
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
		return data_getValuesByProperty(property)
	}

	/** reducer_nodeStyleMapping =======================================================**/
	function reducer_nodeStyleMapping(event) {
		let type = event.type.substring('node.style.mapping.'.length)
		switch (type) {
		case 'update':
			reducer_nodeStyleMapping_update(event.data)
			break;
		case 'remove':
			reducer_nodeStyleMapping_remove(event.data)
			break;
		default:

		}
	}

	function reducer_nodeStyleMapping_update(data) {
		let mappingData = config.style.node.mapping[data.styleName]
		if (mappingData.state === 'inited' && mappingData.data.mappingType === data.mappingType && mappingData.data.mappingColumn == data.mappingColumn) {
			return
		}
		config.style.node.mapping[data.styleName] = {
			state: "inited",
			data: {
				mappingColumn: data.mappingColumn,
				mappingType: data.mappingType,
				mappingContent: []
			}
		}
	}

	function reducer_nodeStyleMapping_remove(data) {
		config.style.node.mapping[data.styleName] = {
			state: "init",
			data: {}
		}
	}
	/**=======================================================**/
	/**=======================================================**/
	/**	reducer_nodeStyleMappingData **/
	/**=======================================================**/
	function reducer_nodeStyleMappingData(event) {
		let type = event.type.substring('node.style.mapping.node.'.length)
		switch (type) {
		case 'update':
			reducer_nodeStyleMappingData_update(event.data)
			break;
		default:

		}
	}

	function reducer_nodeStyleMappingData_update(data) {
		let {
			styleName,
			propertyName,
			mappingType,
			propertyValue,
			styleValue
		} = data
		let mapping = config.style.node.mapping[styleName].data
		if (mapping.mappingColumn !== propertyName || mapping.mappingType !== mappingType) {
			mapping.mappingColumn = propertyName
			mapping.mappingType = mappingType
			mapping.mappingContent = []
		}
		if (propertyValue && styleValue) {

			let item = _.find(mapping.mappingContent, {
				propertyValue: propertyValue
			})
			if (item) {
				item.styleValue = styleValue
			} else {
				mapping.mappingContent.push({
					propertyValue,
					styleValue
				})
			}
		}
	}

	/**=======================================================>>**/
	function data_load(data) {
		config.data.cytoscape.elements.nodes = [{
				"group": "nodes",
				"data": {
					"id": "n1",
					"p1": "n1-p1",
					"p2": "n1-p2",
					"p3": "n1-p3",
					"p4": "n1-p4",
					"name": "n1-name"
				}
			},
			{
				"group": "nodes",
				"data": {
					"id": "n2",
					"p1": "n2-p1",
					"p2": "n2-p2",
					"p3": "n2-p3",
					"p4": "n2-p4",
					"name": "n2-name"
				}
			}]
		config.data.cytoscape.elements.edges = [{
			"group": "edges",
			"data": {
				"id": "n1-n2",
				"source": "n1",
				"target": "n2"
			}
		 }]
	}

	function data_updateNodeMappingStyle(styleName, propertyName, propertyValue, styleValue) {
		let mapping = config.style.node.mapping[styleName].data
		if (mapping.columnName !== propertyName) {
			mapping.mappingContent = []
		}
		let item = _.find(mapping.mappingContent, {
			propertyValue: propertyValue
		})
		if (item) {
			item.styleValue = styleValue
		} else {
			mapping.mappingContent.push({
				propertyValue,
				styleValue
			})
		}
	}

	function data_getValuesByProperty(property) {
		if (!config.data || !config.data.cytoscape || !property || property === '') {
			return []
		} else {
			let valueSet = new Set()

			config.data.cytoscape.elements.nodes.filter((item) => {
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
	/**styleValue==null的時候是刪除**/
	function data_updateNodeTrunkStyle(styleName, styleValue) {
		if (styleValue == null) {
			delete config.style.node.trunk[styleName]
		} else {
			config.style.node.trunk[styleName] = {
				styleValue
			}
		}
	}

	function service_getStyle() {
		let nodeTrunkStyle = service_getNodeTrunkStyle()
		let nodeMappingStyle = service_getNodeMappingStyle()
		let nodeSpecificStyle = service_getNodeSpecificStyle()
		let edgeTrunkStyle = service_getEdgeTrunkStyle()
		let edgeMappingStyle = service_getEdgeMappingStyle()
		let edgeSpecificStyle = service_getEdgeSpecificStyle()
		let style = _.concat(nodeTrunkStyle, nodeMappingStyle, nodeSpecificStyle, edgeTrunkStyle, edgeMappingStyle, edgeSpecificStyle)
		return style
	}

	function service_getEdgeSpecificStyle() {
		console.log('todo')
		let style = []
		return style
	}

	function service_getEdgeMappingStyle() {
		console.log(config)
		let style = []
		return style
	}

	function service_getEdgeTrunkStyle() {
		console.log('todo')
		let style = []
		return style
	}

	function service_getNodeSpecificStyle() {
		console.log('todo')
		let style = []
		return style
	}

	function service_getNodeMappingStyle() {
		let defaultNodeConfig = config.defaultStyle.node
		let nodeConfig = config.style.node
		let nodeMappingConfig = Object.assign({}, defaultNodeConfig.mapping, nodeConfig.mapping)
		let style = []
		Object.keys(nodeMappingConfig).forEach((key) => {
			let selector = null
			let mappingData = nodeMappingConfig[key]
			if (mappingData.state !== 'init') {
				let mappingColumn = mappingData.data.mappingColumn
				mappingData.data.mappingContent.forEach((item) => {
					let propertyValue = item.propertyValue
					let styleValue = item.styleValue
					style.push({
						selector: `node[${mappingColumn}="${propertyValue}"]`,
						style: {
							[key]: styleValue
						}
					})
				})
			}
		})
		return style
	}

	function service_getNodeTrunkStyle() {
		let defaultNodeConfig = config.defaultStyle.node
		let nodeConfig = config.style.node
		let nodeTrunkConfig = Object.assign({}, defaultNodeConfig.trunk, nodeConfig.trunk)
		let style = []
		Object.keys(nodeTrunkConfig).forEach((key) => {
			let selector = null
			if (nodeTrunkConfig[key] && nodeTrunkConfig[key].styleValue) {
				selector = {
					selector: 'node',
					style: {
						[key]: nodeTrunkConfig[key].styleValue
					}
				}
			}
			if (selector) {
				style.push(selector)
			}
		})
		return style
	}



	function service_loadLocalStorageData() {
		let _config
		try {
			let configString = localStorage.getItem('cybrowse-data-lasted')
			if (configString) {
				_config = JSON.parse(configString)
			}
		} catch (e) {
			_config = null
		}
		if (!_config) {
			_config = new ConfigModel()
		}
		if (!_config.data.cytoscape.elements.nodes) {
			_config.data.cytoscape.elements.nodes = []
		}
		if (!_config.data.cytoscape.elements.edges) {
			_config.data.cytoscape.elements.edges = []
		}
		config = _config
	}

	function service_save() {

		let cytoscape = cytoscapeManager.getCytoscape()
		let cytoscapeData = cytoscape.json()
		config.data.cytoscape = cytoscapeData
		let configString = JSON.stringify(config)
		console.log(configString)
		localStorage.setItem("cybrowse-data-lasted", configString)
	}
}

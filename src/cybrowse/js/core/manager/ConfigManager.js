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
	this.updateGlobalStyle = updateGlobalStyle
	this.loadLocalStorageData = loadLocalStorageData
	this.getProperties = getProperties
	this.getPropertyValuesByPropertyName = getPropertyValuesByPropertyName
	this.clearLocalData = clearLocalData
	this.load = load
	this.getStyle = getStyle
	this.getNodes = getNodes
	this.getEdges = getEdges
	this.getLayout = getLayout
	this.getElements = getElements
	this.updateNodeMappingStyle = updateNodeMappingStyle
	this.updateNodeTrunkStyle = updateNodeTrunkStyle
	this.emitEvent = emitEvent
	this.updateLayout = updateLayout
		/** base **/
	function init(props) {
		cytoscapeManager = props.cytoscapeManager
		service_loadLocalStorageData()
	}

	function updateLayout(layoutName) {
		let defaultLayout = _.find(configs.layout, {
			name: layoutName
		})
		defaultLayout = defaultLayout || configs.layout[0]
		config.defaultLayout = _.cloneDeep(defaultLayout)
	}

	function emitEvent(data) {
		let type = data.type
		console.log(data)
		if (_.startsWith(type, 'node.style.mapping.data')) {
			reducer_nodeStyleMappingData(data)
		} else if (_.startsWith(type, 'node.style.mapping')) {
			reducer_nodeStyleMapping(data)
		} else if (_.startsWith(type, 'node.style.specific.data')) {
			reducer_nodeStyleSpecificData(data)
		}
	}

	function getData() {
		config = config || new ConfigModel()
		return config
	}

	function getLayout() {
		return service_getLayout()
	}

	function getStyle() {
		return service_getStyle()
	}

	function getNodes() {
		return config.cytoscape.elements.nodes || []
	}

	function getEdges() {
		return config.cytoscape.elements.edges || []
	}

	function getElements() {
		return _.concat(config.cytoscape.elements.nodes, config.cytoscape.elements.edges)
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

	function updateGlobalStyle(styleName) {
		let defaultStyle = _.find(configs.style, {
			name: styleName
		})
		defaultStyle = defaultStyle || configs.style[0]
		config.defaultStyle = _.cloneDeep(defaultStyle)
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
		if (!config.data || !config.cytoscape) {
			return []
		} else {
			let propertySet = new Set()
			config.cytoscape.elements.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
				Object.keys(item.data).forEach((property) => {
					propertySet.add(property)
				})
			})
			return [...propertySet]
		}
	}

	function getPropertyValuesByPropertyName(property) {
		return data_getPropertyValuesByPropertyName(property)
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
			styleValue = ''
		} = data
		let mapping = config.style.node.mapping[styleName].data
		if (mapping.mappingColumn !== propertyName || mapping.mappingType !== mappingType) {
			mapping.mappingColumn = propertyName
			mapping.mappingType = mappingType
			mapping.mappingContent = []
		}
		if (propertyValue) {

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
	/**=======================================================**/
	/**	reducer_nodeStyleSpecificData **/
	/**=======================================================**/
	function reducer_nodeStyleSpecificData(event) {
		let type = event.type.substring('node.style.specific.data.'.length)
		switch (type) {
			case 'update':
				reducer_nodeStyleSpecificData_update(event.data)
				break;
			case 'remove':
				reducer_nodeStyleSpecificData_remove(event.data)
				break;
			default:

		}
	}

	function reducer_nodeStyleSpecificData_update(data) {
		let {
			styleName,
			idName,
			styleValue
		} = data
		let specificDatas = config.style.node.specific[styleName].data
		let specificData = _.find(specificDatas, {
			idName
		})
		if (specificData) {
			specificData.styleValue = styleValue
		} else {
			specificDatas.push({
				idName,
				styleValue
			})
		}
	}

	function reducer_nodeStyleSpecificData_remove(data) {
		let {
			styleName,
			idName,
		} = data
		let specificDatas = config.style.node.specific[styleName].data
		_.remove(specificDatas, (item) => {
			return item.idName === idName
		})
	}

	/**=======================================================>>**/
	function data_load(data) {
		if (data) {
			config = data
		} else {
			config = new ConfigModel()
			config.cytoscape.elements.nodes = [{
				"group": "nodes",
				"data": {
					"id": "n1",
					"p1": "p",
					"p2": "",
					"p3": "n1-p3",
					"p4": "q",
					"name": "n1-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n2",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n3",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n4",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n5",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n6",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n7",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n8",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}, {
				"group": "nodes",
				"data": {
					"id": "n9",
					"p1": "p",
					"p2": "n2-p2",
					// "p3": "n2-p3",
					"p4": "q",
					"name": "n2-name"
				}
			}]
			config.cytoscape.elements.edges = [{
				"group": "edges",
				"data": {
					"id": "n1-n2",
					"source": "n1",
					"target": "n2"
				}
			}, {
				"group": "edges",
				"data": {
					"id": "n3-n2",
					"source": "n3",
					"target": "n2"
				}
			},{
				"group": "edges",
				"data": {
					"id": "n4-n2",
					"source": "n4",
					"target": "n2"
				}
			},{
				"group": "edges",
				"data": {
					"id": "n5-n3",
					"source": "n5",
					"target": "n3"
				}
			},{
				"group": "edges",
				"data": {
					"id": "n6-n7",
					"source": "n6",
					"target": "n7"
				}
			},{
				"group": "edges",
				"data": {
					"id": "n7-n8",
					"source": "n7",
					"target": "n8"
				}
			},{
				"group": "edges",
				"data": {
					"id": "n1-n8",
					"source": "n1",
					"target": "n8"
				}
			}]
		}
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

	function data_getPropertyValuesByPropertyName(property) {
		if (!config.data || !config.cytoscape || !property || property === '') {
			return []
		} else {
			let valueSet = new Set()

			config.cytoscape.elements.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
				// 为了提高效率，此处假设外部传入的property属性一定是存在的
				// if (_.includes(_.keys(item.data), property)) {
				// 	valueSet.add(item[property] || "")
				// }
				valueSet.add(item.data[property] || "")
			})
			let propertyValues = [...valueSet]
			if (_.includes(propertyValues, '')) {
				_.pull(propertyValues, '')
					// propertyValues.unshift('')
			}
			return propertyValues
		}
	}
	/**styleValue==null的時候是刪除**/
	function data_updateNodeTrunkStyle(styleName, styleValue) {
		if (styleValue == null) {
			config.style.node.trunk[styleName] = null
		} else {
			config.style.node.trunk[styleName] = {
				styleValue
			}
		}
	}

	function service_getLayout() {
		return config.defaultLayout
	}

	function service_getStyle() {
		let nodeTrunkStyle = service_getNodeTrunkStyle()
		let nodeMappingStyle = service_getNodeMappingStyle()
		let nodeSpecificStyle = service_getNodeSpecificStyle()
		let edgeTrunkStyle = service_getEdgeTrunkStyle()
		let edgeMappingStyle = service_getEdgeMappingStyle()
		let edgeSpecificStyle = service_getEdgeSpecificStyle()
		let baseStyle = service_getBaseStyle()
		baseStyle = []
		let style = _.concat(nodeTrunkStyle, nodeMappingStyle, nodeSpecificStyle, edgeTrunkStyle, edgeMappingStyle, edgeSpecificStyle, baseStyle)
		return style
	}

	function service_getBaseStyle() {
		return [{
			selector: 'node:selected',
			style: {
				'background-color': 'red'
			}
		}, {
			selector: 'edge:selected',
			style: {
				'line-color': 'blue'
			}
		}]
	}

	function service_getEdgeSpecificStyle() {
		console.log('todo')
		let style = []
		return style
	}

	function service_getEdgeMappingStyle() {
		let style = []
		return style
	}

	function service_getEdgeTrunkStyle() {
		console.log('todo')
		let style = []
		return style
	}

	function service_getNodeSpecificStyle() {
		let defaultNodeConfig = config.defaultStyle.node
		let nodeConfig = config.style.node
		let nodeSpecificConfig = _.merge({}, _.cloneDeep(defaultNodeConfig.specific), nodeConfig.specific)
		let style = []
		Object.keys(nodeSpecificConfig).forEach((styleName) => {
			let selector = null
			let specificData = nodeSpecificConfig[styleName]
			if (specificData.data) {
				specificData.data.forEach((item) => {
					let idName = item.idName
					let styleValue = item.styleValue
					style.push({
						selector: `node#${idName}`,
						style: {
							[styleName]: styleValue
						}
					})
				})
			}
		})
		return style
	}

	function service_getNodeMappingStyle() {
		let defaultNodeConfig = config.defaultStyle.node
		let nodeConfig = config.style.node
		let nodeMappingConfig = Object.assign({}, defaultNodeConfig.mapping, nodeConfig.mapping)
		let style = []
		Object.keys(nodeMappingConfig).forEach((styleName) => {
			let selector = null
			let mappingData = nodeMappingConfig[styleName]
			if (mappingData.state !== 'init') {
				let mappingColumn = mappingData.data.mappingColumn
				mappingData.data.mappingContent.forEach((item) => {
					let propertyValue = item.propertyValue
					let styleValue = item.styleValue
					style.push({
						selector: `node[${mappingColumn}="${propertyValue}"]`,
						style: {
							[styleName]: styleValue
						}
					})
				})
			}
		})
		return style
	}

	function service_getNodeTrunkStyle() {
		let defaultNodeTrunkConfig = config.defaultStyle.node.trunk
		let nodeConfig = config.style.node.trunk
		let customNodeTrunkConfigs = _.cloneDeep(defaultNodeTrunkConfig)

		Object.keys(defaultNodeTrunkConfig).forEach((key) => {
			if (nodeConfig[key] && nodeConfig[key].styleValue) {
				customNodeTrunkConfigs[key].styleValue = nodeConfig[key].styleValue
			}
		})

		let style = []
		Object.keys(customNodeTrunkConfigs).forEach((key) => {
			let selector = null
			if (customNodeTrunkConfigs[key] && customNodeTrunkConfigs[key].styleValue) {
				selector = {
					selector: 'node',
					style: {
						[key]: customNodeTrunkConfigs[key].styleValue
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
		if (!_config.cytoscape.elements.nodes) {
			_config.cytoscape.elements.nodes = []
		}
		if (!_config.cytoscape.elements.edges) {
			_config.cytoscape.elements.edges = []
		}
		config = _config
	}

	function service_save() {

		let cytoscape = cytoscapeManager.getCytoscape()
		let cytoscapeData = cytoscape.json()
		config.cytoscape = cytoscapeData
		let configString = JSON.stringify(config)
		console.log(config)
		localStorage.setItem("cybrowse-data-lasted", configString)
	}
}
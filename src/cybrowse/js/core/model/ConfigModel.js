import configs from '../common/configs'
export default function ConfigModel() {

	this.defaultLayout = configs.layout[0]
	this.defaultStyle = configs.style[0]
	this.data = {
		nodes: [],
		edges: [],
	}
	this.cytoscape = {
		elements: {
			nodes: [],
			edges: []
		}
	}
	this.style = {
		general: {},
		node: {
			trunk: {
				'background-color': {
					state: 'init',
					styleValue: null
				}
			},
			mapping: {
				'background-color': {
					state: 'init',
					data: null
				}
			},
			specific: {
				'background-color': {
					data: [
// {
// 	idName:XX
//	styleValue:XX
// }

					]
				}
			}
		},
		edge: {
			trunk: {
				// 'background-color': {
				// 	styleValue: ""
				// }
			},
			mapping: {},
			specific: {}
		},
	}
}
let configDemo = {
	defaultLayout: {},
	layout: {},
	data: {
		nodes: [],
		edges: [],
		cytoscape: {
			elements: {
				nodes: [],
				edges: []
			}
		}
	},
	style: {
		general: {},
		node: {
			trunk: {
				'background-color': {
					styleValue: ""
				}
			},
			mapping: {
				'background-color': {
					mappingColumn: 'columnName',
					mappingType: '',
					mappingContent: [
						{
							columnValue: 'columnValue',
							styleValue: 'styleValue'
						}
					]
				}
			},
			specific: {}
		},
		edge: {
			trunk: {
				'background-color': {
					styleValue: ""
				}
			},
			mapping: {},
			specific: {}
		},
	}
}

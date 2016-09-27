import configs from '../common/configs'
export default function ConfigModel() {

	this.defaultLayout = configs.layout[0]
	this.defaultStyle = configs.style[0]
	this.data = {
		nodes: [],
		edges: [],
		cytoscape: {
			elements: {
				nodes: [],
				edges: []
			}
		}
	}
	this.cytoscape = null
	this.style = {
		general: {},
		node: {
			trunk: {
				'background-color': {
					state: 'inited',
					styleValue: "black"
				}
			},
			mapping: {
				'background-color': {
					state: 'init',
					data: null
				}
			},
			specific: {}
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

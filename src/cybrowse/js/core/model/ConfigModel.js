export default function ConfigModel() {

	this.defaultLayout = null
	this.defaultStyle = null
	this.data = null
}
let configDemo = {
	defaultLayout: {},
	layout: {},
	data: {
		nodes: [],
		edges: []
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

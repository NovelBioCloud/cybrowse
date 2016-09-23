export default class StyleConfigModel {
	let config = {
		globalConfig: {},
		nodeConfig: {
			trunk: {
				'background-color': {
					styleValue: ""
				}
			},
			mapping: {
				'background-color': {
					column: "",
					type: "",
					content: [{
						columnValue: "",
						styleValue: "",
					}]
				},
				'width': {
					column: "",
					type: "",
					content: []
				}
			},
			specific: {
				'background-color': [{
					id: "",
					styleValue: ""
				}]
			}

		},
		edgeConfig: {

		},
		layout: {

		}

	}
	globalConfig
	nodeConfig = {
		trunk: {
			'background-color': 'red'
		},
		mapping: {
			backgroundColor: {
				mappingType: "",
				mappingColumn: "",
				mappingContent: [{
					propertyValue: "",
					styleValue: "",
					style: {
						selector: "",
						style: {
							'background-color': ''
						}
					}
				}]
			}
		},
		specific = {
			backgroundColor: {
				styles: [{
					id: "",
					style: {
						selector: "",
						style: {
							'background-color': ''
						}
					}
				}]
			}
		}
	}
	edgeConfig = {
		trunk = [],
		mapping = [],
		specific = []
	}

}

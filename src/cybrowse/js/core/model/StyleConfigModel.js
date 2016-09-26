export default class StyleConfigModel {
	let config = {
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
			edge: {
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
		},
		"layout": {
			name: "..."
		}
	}


}

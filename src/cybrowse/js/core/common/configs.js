let defaultConfig = {
	style: [{
		name: 'DefaultConfig',
		general: {},
		node: {
			trunk: {
				'background-color': {
					styleValue: "red"
				},
				'width': {
					styleValue: 30
				},
				height: {
					styleValue: 50
				}
			},
			mapping: {},
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
	}, {
		name: 'DefaultConfig2',
		general: {},
		node: {
			trunk: {
				'background-color': {
					styleValue: ""
				}
			},
			mapping: {},
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
	}],
	layout: [{
		"name": "cose",
		"ready": function () {},
		"stop": function () {},
		"animate": true,
		"animationThreshold": 250,
		"refresh": 20,
		"fit": true,
		"padding": 30,
		"boundingBox": undefined,
		"randomize": false,
		"componentSpacing": 100,
		"nodeRepulsion": function (node) {
			return 400000;
		},
		"nodeOverlap": 10,
		"idealEdgeLength": function (edge) {
			return 10;
		},
		"edgeElasticity": function (edge) {
			return 100;
		},
		"nestingFactor": 5,
		"gravity": 80,
		"numIter": 1000,
		"initialTemp": 200,
		"coolingFactor": 0.95,
		"minTemp": 1.0,
		"useMultitasking": true
  	}, {
		name: 'breadthfirst',
		fit: true, // whether to fit the viewport to the graph
		directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
		padding: 30, // padding on fit
		circle: false, // put depths in concentric circles if true, put depths top down if false
		spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
		roots: undefined, // the roots of the trees
		maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
		animate: false, // whether to transition the node positions
		animationDuration: 500, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
    }, {
		name: 'circle',

		fit: true, // whether to fit the viewport to the graph
		padding: 30, // the padding on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
		radius: undefined, // the radius of the circle
		startAngle: 3 / 2 * Math.PI, // where nodes start in radians
		sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
		clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
		sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
		animate: false, // whether to transition the node positions
		animationDuration: 500, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
  }, {
		name: 'grid',

		fit: true, // whether to fit the viewport to the graph
		padding: 30, // padding used on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
		avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
		condense: false, // uses all available space on false, uses minimal space on true
		rows: undefined, // force num of rows in the grid
		cols: undefined, // force num of columns in the grid
		position: function (node) {}, // returns { row, col } for element
		sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
		animate: false, // whether to transition the node positions
		animationDuration: 500, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
  }, {
		name: 'preset',

		positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
		zoom: undefined, // the zoom level to set (prob want fit = false if set)
		pan: undefined, // the pan level to set (prob want fit = false if set)
		fit: true, // whether to fit to viewport
		padding: 30, // padding on fit
		animate: false, // whether to transition the node positions
		animationDuration: 500, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
  }]
}
export default defaultConfig

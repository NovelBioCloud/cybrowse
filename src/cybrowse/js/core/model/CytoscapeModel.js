export default class CytoscapeModel {
	boxSelectionEnabled = true
	elements = {
		nodes: [],
		edges: []
	}
	hideEdgesOnViewport
	maxZoom = 1e+50
	minZoom = 1e-50
	motionBlur
	pan = {
		x: 0,
		y: 0
	}
	panningEnabled = true
	renderer = {
		name: "canvas"
	}
	style = []
	textureOnViewport
	serPanningEnabled = true
	userZoomingEnabled = true
	wheelSensitivity = undefined
	zoom = 1
	zoomingEnabled = true

}

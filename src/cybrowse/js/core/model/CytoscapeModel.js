export default class CytoscapeModel {
	constructor(){
		this.boxSelectionEnabled = true
		this.elements = {
				nodes: [],
				edges: []
			}
		this.hideEdgesOnViewport
		this.maxZoom = 1e+50
		this.minZoom = 1e-50
		this.motionBlur
		this.pan = {
				x: 0,
				y: 0
			}
		this.panningEnabled = true
		this.renderer = {
				name: "canvas"
			}
		this.style = []
		this.textureOnViewport
		this.serPanningEnabled = true
		this.userZoomingEnabled = true
		this.wheelSensitivity = undefined
		this.zoom = 1
		this.zoomingEnabled = true
	}

}

export default function CytoscapeManager() {
	let cytoscape
	let configManager
	this.init = init
	this.setCytoscape = setCytoscape
	this.getCytoscape = getCytoscape
	this.updateCytoscapeView = updateCytoscapeView

	function init(props) {
		configManager = props.configManager
	}

	function setCytoscape(_cytoscape) {
		cytoscape = _cytoscape
	}

	function getCytoscape() {
		return cytoscape
	}

	function updateCytoscapeView() {
		cytoscape && cytoscape.style().resetToDefault().fromJson(configManager.getStyle()).update()
	}
}

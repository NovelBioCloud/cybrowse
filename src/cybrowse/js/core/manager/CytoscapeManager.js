export default function CytoscapeManager() {
	let cytoscape
	this.setCytoscape = setCytoscape
	this.getCytoscape = getCytoscape

	function setCytoscape(_cytoscape) {
		cytoscape = _cytoscape
	}

	function getCytoscape() {
		return cytoscape
	}
}

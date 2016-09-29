export default function CytoscapeManager() {
	let cytoscape
	let configManager
	this.init = init
	this.setCytoscape = setCytoscape
	this.getCytoscape = getCytoscape

	/**
	 * @deprecated
	 * use updateCytoscapeStyle instead
	 **/
	this.updateCytoscapeView = updateCytoscapeView
	this.updateCytoscapeLayout = updateCytoscapeLayout
	this.updateCytoscapeStyle = updateCytoscapeStyle

	function init(props) {
		configManager = props.configManager
	}

	function setCytoscape(_cytoscape) {
		cytoscape = _cytoscape
	}

	function getCytoscape() {
		return cytoscape
	}

	/**
	 * @deprecated
	 * use updateCytoscapeStyle instead
	 **/
	function updateCytoscapeView() {
		cytoscape && cytoscape.style().resetToDefault().fromJson(configManager.getStyle()).update()
	}

	function updateCytoscapeStyle() {
		cytoscape && cytoscape.style().resetToDefault().fromJson(configManager.getStyle()).update()
	}

	function updateCytoscapeLayout() {
		cytoscape && cytoscape.layout(configManager.getLayout())
	}
}
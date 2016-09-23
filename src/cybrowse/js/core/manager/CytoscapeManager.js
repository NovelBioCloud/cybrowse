export default function ConfigManager() {
	let cytoscape
	this.setCytoscape = (_cytoscape) => {
		cytoscape = _cytoscape
	}
	this.getCytoscape = () => cytoscape
}

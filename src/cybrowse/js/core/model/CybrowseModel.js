import CytoscapeModel from './CytoscapeModel'
import ConfigModel from './ConfigModel'
export default class CybrowseModel {
	cytoscape = new CytoscapeModel()
	config = new ConfigModel()
	layout
}

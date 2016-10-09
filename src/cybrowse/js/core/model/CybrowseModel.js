import CytoscapeModel from './CytoscapeModel'
import ConfigModel from './ConfigModel'
export default class CybrowseModel {
	constructor(){
		this.cytoscape = new CytoscapeModel()
		this.config = new ConfigModel()
		this.layout = null
	}

}

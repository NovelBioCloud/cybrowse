import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import $ from 'jquery';
import Registry from './Registry';
export default class Provider {
	constructor(container, defaultConfig, defaultStyle) {
		this.cy = cytoscape(Object.assign({
			elements: []
		}, defaultConfig, {
			container: $(container),
			style: defaultStyle,
		}));
		this.pluginMap = Registry.registerPlugin(this.cy);
	}
	getPluginMap() {
		return this.pluginMap();
	}
	getCytoscape() {
		return this.cy;
	}
}

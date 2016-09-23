import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {
	DefaultConfigManager,
	DataManager,
	CytoscapeManager,
} from './manager'

export default function Manager() {
	let _this = this
		//** manager **//
	let defaultConfigManager
	let dataManager
	let cytoscapeManager = new CytoscapeManager()
	let dataService = getDataService()
	this.init = (cb) => {
		dataService.initDefaultConfigManager(() => {
			dataService.initDataManager()
			cb()
		})
	}
	this.setCytoscape = (cytoscape) => {
		cytoscapeManager.setCytoscape(cytoscape)
	}
	this.getDataManager = () => {
		return dataManager
	}
	this.getDefaultConfigManager = () => {
		return defaultConfigManager
	}
	this.getConfigs = () => {
		return [{
			name: 'test1',
			styles: [{
				selector: "",
				style: {}
				}],
			layout: {

			}
		}]
	}
	this.updateDefaultConfig = () => {
		console.log('todo')
	}

	function getDataService() {
		return {
			initDefaultConfigManager: (cb) => {
				defaultConfigManager = new DefaultConfigManager()
				defaultConfigManager.load(cb)
			},
			initDataManager: (cb) => {
				dataManager = new DataManager()
				dataManager.load(cb)
			},
		}
	}
}

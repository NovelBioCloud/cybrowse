import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {
	DefaultConfigManager,
	DataManager,
	DefaultNodeConfigManager,
	DefaultEdgeConfigManager,
	DefaultNetworkConfigManager,
	DefaultLayoutConfigManager,
	CustomNodeConfigManager,
	CustomEdgeConfigManager,
	CustomNetworkConfigManager,
	CustomLayoutConfigManager,
	ComputedNodeConfigManager,
	ComputedEdgeConfigManager,
	ComputedNetworkConfigManager,
	ComputedLayoutConfigManager
} from './manager'

export default function Manager() {
	let _this = this
		//** manager **//
	let defaultConfigManager
	let dataManager
	let defaultNodeConfigManager
	let defaultEdgeConfigManager
	let defaultNetworkConfigManager
	let defaultLayoutConfigManager
	let customNodeConfigManager
	let customEdgeConfigManager
	let customNetworkConfigManager
	let customLayoutConfigManager
	let computedNodeConfigManager
	let computedEdgeConfigManager
	let computedNetworkConfigManager
	let computedLayoutConfigManager
	let dataService = getDataService()
	this.init = (cb) => {
		async.series([
				(cb) => {
					dataService.initDefaultConfigManager(cb)
        }, (cb) => {
					dataService.initDataManager()
					cb()
        }, (cb) => {
					dataService.initManagers(cb)
        }, (cb) => {
					cb()
        }
      ],
			(err, results) => {
				cb(err, results)
			})
	}
	this.getNodeConfigManager = () => {
		return {
			'default': defaultNodeConfigManager,
			custom: customNodeConfigManager,
			computed: computedNodeConfigManager
		}
	}
	this.getDataManager = () => {
		return dataManager
	}
	this.getDefaultConfigManager = () => {
		return defaultConfigManager
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
			initManagers: (cb) => {
				/** default **/
				defaultNodeConfigManager = new DefaultNodeConfigManager(defaultConfigManager)
				defaultEdgeConfigManager = new DefaultEdgeConfigManager(defaultConfigManager)
				defaultNetworkConfigManager = new DefaultNetworkConfigManager(defaultConfigManager)
				defaultLayoutConfigManager = new DefaultLayoutConfigManager(defaultConfigManager)
					/** custom **/
				customNodeConfigManager = new CustomNodeConfigManager(dataManager)
				customEdgeConfigManager = new CustomEdgeConfigManager(dataManager)
				customNetworkConfigManager = new CustomNetworkConfigManager(dataManager)
				customLayoutConfigManager = new CustomLayoutConfigManager(dataManager)
					/** computed **/
				computedNodeConfigManager = new ComputedNodeConfigManager(defaultNodeConfigManager, customNodeConfigManager)
				computedEdgeConfigManager = new ComputedEdgeConfigManager(defaultEdgeConfigManager, customEdgeConfigManager)
				computedNetworkConfigManager = new ComputedNetworkConfigManager(defaultNetworkConfigManager, customNetworkConfigManager)
				computedLayoutConfigManager = new ComputedLayoutConfigManager(defaultLayoutConfigManager, customLayoutConfigManager)
				cb()
			}
		}
	}
}

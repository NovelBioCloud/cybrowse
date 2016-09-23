import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {
	DefaultConfigManager,
	DataManager,
} from './manager'

export default function Manager() {
	let _this = this
		//** manager **//
	let defaultConfigManager
	let dataManager
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
			initManagers: (cb) => {
				cb()
			}
		}
	}
}

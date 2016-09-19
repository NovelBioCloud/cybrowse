import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomNetworkConfigService() {
	this.compute = (defaultNetworkConfig, customNetworkConfig) => {
		//TODO
		return null
	}
}

export default function CustomNetworkConfigManager(defaultNetworkConfigManager, customNetworkConfigManager) {
  assert(defaultNetworkConfigManager)
  assert(customNetworkConfigManager)
	let customNetworkConfig
	let customNetworkConfigService = new CustomNetworkConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomNetworkConfig()
			callback && callback(null, customNetworkConfig)
			publishEvent && postal.channel().publish('customNetworkConfig.reload', customNetworkConfig)
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return customNetworkConfig
	}
	computeCustomNetworkConfig()
	initSubscription()

	function computeCustomNetworkConfig() {
		let defaultNetworkConfig = defaultNetworkConfigManager.getData()
		let customConfig = customNetworkConfigManager.getData()
		customNetworkConfig = customNetworkConfigService.compute(defaultNetworkConfig, customNetworkConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultNetworkConfigManager.reload', (data) => {
			this.reload(null, true)
		})
		postal.channel().subscribe('customNetworkConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

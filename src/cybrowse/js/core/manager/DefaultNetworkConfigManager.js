import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DefaultNetworkConfigService() {
	this.compute = (defaultConfig) => {
		return defaultConfig
	}
}

export default function DefaultNetworkConfigManager(defaultConfigManager) {
	assert(defaultConfigManager)
	let defaultNetworkConfig
	let defaultNetworkConfigService = new DefaultNetworkConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeDefaultNetworkConfig()
			callback && callback(null, defaultNetworkConfig)
			publishEvent && postal.channel().publish('defaultNetworkConfig.reload', this.getData())
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return defaultNetworkConfig
	}
	computeDefaultNetworkConfig()
	initSubscription()

	function computeDefaultNetworkConfig() {
		let defaultConfig = defaultConfigManager.getData()
		defaultNetworkConfig = defaultNetworkConfigService.compute(defaultConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

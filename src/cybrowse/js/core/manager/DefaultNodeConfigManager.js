import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DefaultNodeConfigService() {
	this.compute = (defaultConfig) => {
		return defaultConfig
	}
}

export default function DefaultNodeConfigManager(defaultConfigManager) {
	assert(defaultConfigManager)
	let defaultNodeConfig
	let defaultNodeConfigService = new DefaultNodeConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeDefaultNodeConfig()
			callback && callback(null, defaultNodeConfig)
			publishEvent && postal.channel().publish('defaultNodeConfig.reload', this.getData())
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return defaultNodeConfig
	}
	computeDefaultNodeConfig()
	initSubscription()

	function computeDefaultNodeConfig() {
		let defaultConfig = defaultConfigManager.getData()
		defaultNodeConfig = defaultNodeConfigService.compute(defaultConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

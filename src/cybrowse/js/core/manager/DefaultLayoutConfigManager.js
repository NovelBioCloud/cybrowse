import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DefaultLayoutConfigService() {
	this.compute = (defaultConfig) => {
		//TODO
		return defaultConfig
	}
}

export default function DefaultLayoutConfigManager(defaultConfigManager) {
	assert(defaultConfigManager)
	let defaultLayoutConfig
	let defaultLayoutConfigService = new DefaultLayoutConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeDefaultLayoutConfig()
			callback && callback(null, defaultLayoutConfig)
			publishEvent && postal.channel().publish('defaultLayoutConfig.reload', this.getData())
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return defaultLayoutConfig
	}
	computeDefaultLayoutConfig()
	initSubscription()

	function computeDefaultLayoutConfig() {
		let defaultConfig = defaultConfigManager.getData()
		defaultLayoutConfig = defaultLayoutConfigService.compute(defaultConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

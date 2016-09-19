import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DefaultEdgeConfigService() {
	this.compute = (defaultConfig) => {
		//TODO
		return defaultConfig
	}
}

export default function DefaultEdgeConfigManager(defaultConfigManager) {
	assert(defaultConfigManager)
	let defaultEdgeConfig
	let defaultEdgeConfigService = new DefaultEdgeConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeDefaultEdgeConfig()
			callback && callback(null, defaultEdgeConfig)
			publishEvent && postal.channel().publish('defaultEdgeConfig.reload', this.getData())
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return defaultEdgeConfig
	}
	computeDefaultEdgeConfig()
	initSubscription()

	function computeDefaultEdgeConfig() {
		let defaultConfig = defaultConfigManager.getData()
		defaultEdgeConfig = defaultEdgeConfigService.compute(defaultConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

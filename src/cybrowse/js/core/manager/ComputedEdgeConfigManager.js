import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomEdgeConfigService() {
	this.compute = (defaultEdgeConfig, customEdgeConfig) => {
		//TODO
		return null
	}
}

export default function CustomEdgeConfigManager(defaultEdgeConfigManager, customEdgeConfigManager) {
  assert(defaultEdgeConfigManager)
  assert(customEdgeConfigManager)
	let customEdgeConfig
	let customEdgeConfigService = new CustomEdgeConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomEdgeConfig()
			callback && callback(null, customEdgeConfig)
			publishEvent && postal.channel().publish('customEdgeConfig.reload', customEdgeConfig)
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return customEdgeConfig
	}
	computeCustomEdgeConfig()
	initSubscription()

	function computeCustomEdgeConfig() {
		let defaultEdgeConfig = defaultEdgeConfigManager.getData()
		let customConfig = customEdgeConfigManager.getData()
		customEdgeConfig = customEdgeConfigService.compute(defaultEdgeConfig, customEdgeConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultEdgeConfigManager.reload', (data) => {
			this.reload(null, true)
		})
		postal.channel().subscribe('customEdgeConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

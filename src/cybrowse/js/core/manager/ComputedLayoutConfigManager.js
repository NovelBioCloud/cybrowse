import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomLayoutConfigService() {
	this.compute = (defaultLayoutConfig, customLayoutConfig) => {
		//TODO
		return null
	}
}

export default function CustomLayoutConfigManager(defaultLayoutConfigManager, customLayoutConfigManager) {
  assert(defaultLayoutConfigManager)
  assert(customLayoutConfigManager)
	let customLayoutConfig
	let customLayoutConfigService = new CustomLayoutConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomLayoutConfig()
			callback && callback(null, customLayoutConfig)
			publishEvent && postal.channel().publish('customLayoutConfig.reload', customLayoutConfig)
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return customLayoutConfig
	}
	computeCustomLayoutConfig()
	initSubscription()

	function computeCustomLayoutConfig() {
		let defaultLayoutConfig = defaultLayoutConfigManager.getData()
		let customConfig = customLayoutConfigManager.getData()
		customLayoutConfig = customLayoutConfigService.compute(defaultLayoutConfig, customLayoutConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultLayoutConfigManager.reload', (data) => {
			this.reload(null, true)
		})
		postal.channel().subscribe('customLayoutConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

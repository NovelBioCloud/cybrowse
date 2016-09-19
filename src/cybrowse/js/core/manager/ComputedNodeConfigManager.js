import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomNodeConfigService() {
	this.compute = (defaultNodeConfig, customNodeConfig) => {
		//TODO
		return null
	}
}

export default function CustomNodeConfigManager(defaultNodeConfigManager, customNodeConfigManager) {
	assert(defaultNodeConfigManager)
  assert(customNodeConfigManager)
	let customNodeConfig
	let customNodeConfigService = new CustomNodeConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomNodeConfig()
			callback && callback(null, customNodeConfig)
			publishEvent && postal.channel().publish('customNodeConfig.reload', customNodeConfig)
		} catch (e) {
			callback && callback(e)
		}
	}

	this.getData = () => {
		return customNodeConfig
	}
	computeCustomNodeConfig()
	initSubscription()

	function computeCustomNodeConfig() {
		let defaultNodeConfig = defaultNodeConfigManager.getData()
		let customConfig = customNodeConfigManager.getData()
		customNodeConfig = customNodeConfigService.compute(defaultNodeConfig, customNodeConfig)
	}

	function initSubscription() {
		postal.channel().subscribe('defaultNodeConfigManager.reload', (data) => {
			this.reload(null, true)
		})
		postal.channel().subscribe('customNodeConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

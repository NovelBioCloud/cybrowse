import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomNodeConfigService() {
	this.compute = (data) => {
		//TODO
		return data
	}
}

export default function CustomNodeConfigManager(dataManager) {
	assert(dataManager)
	let customNodeConfig
	let customNodeConfigService = new CustomNodeConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomNodeConfig()
			callback && callback(null, customNodeConfig)
			publishEvent && postal.channel().publish('customNodeConfig.reload', this.getData())
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
		let data = dataManager.getData()
		customNodeConfig = customNodeConfigService.compute(data)
	}

	function initSubscription() {
		postal.channel().subscribe('customNodeConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

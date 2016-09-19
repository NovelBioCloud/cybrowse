import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomNetworkConfigService() {
	this.compute = (data) => {
		//TODO
		return data
	}
}

export default function CustomNetworkConfigManager(dataManager) {
	assert(dataManager)
	let customNetworkConfig
	let customNetworkConfigService = new CustomNetworkConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomNetworkConfig()
			callback && callback(null, customNetworkConfig)
			publishEvent && postal.channel().publish('customNetworkConfig.reload', this.getData())
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
		let data = dataManager.getData()
		customNetworkConfig = customNetworkConfigService.compute(data)
	}

	function initSubscription() {
		postal.channel().subscribe('customNetworkConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

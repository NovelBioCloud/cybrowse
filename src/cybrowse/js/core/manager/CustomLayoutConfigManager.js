import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomLayoutConfigService() {
	this.compute = (data) => {
		//TODO
		return data
	}
}

export default function CustomLayoutConfigManager(dataManager) {
	assert(dataManager)
	let customLayoutConfig
	let customLayoutConfigService = new CustomLayoutConfigService()
	this.reload = (callback, publishEvent = false) => {
		try {
			computeCustomLayoutConfig()
			callback && callback(null, customLayoutConfig)
			publishEvent && postal.channel().publish('customLayoutConfig.reload', this.getData())
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
		let data = dataManager.getData()
		customLayoutConfig = customLayoutConfigService.compute(data)
	}

	function initSubscription() {
		postal.channel().subscribe('customLayoutConfigManager.reload', (data) => {
			this.reload(null, true)
		})
	}
}

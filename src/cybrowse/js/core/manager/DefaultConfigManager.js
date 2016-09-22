import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DefaultConfigService() {
	this.load = (url = 'data/defaultConfig.json') => {
		return $.getJSON(url)
	}
}

export default function DefaultConfigManager() {
	let defaultConfig
	let defaultConfigService = new DefaultConfigService()
	this.load = (callback, emitEvent = false) => {
		defaultConfigService.load().then((data) => {
			defaultConfig = data
			if (callback) {
				callback(null, data)
			}
		}, () => {
			callback(new Error("reload error"))
		})
	}
	this.getData = () => {
		return defaultConfig
	}
}

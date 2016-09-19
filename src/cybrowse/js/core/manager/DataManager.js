import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function DataService() {
	this.load = (url = 'data/data.json') => {
		return $.getJSON(url)
	}
}

export default function DataManager() {
	let data
	let dataService = new DataService()
	this.load = (callback, emitEvent = false) => {
		dataService.load().then((data) => {
			data = data
			if (callback) {
				callback(null, data)
			}
			if (emitEvent) {
				postal.channel().publish('dataManager.load', data)
			}
		}, () => {
			callback(new Error("reload error"))
		})
	}
	this.reload = (callback, emitEvent = false) => {
		dataService.load().then((data) => {
			data = data
			if (callback) {
				callback(null, data)
			}
			if (emitEvent) {
				postal.channel().publish('dataManager.reload', data)
			}
		}, () => {
			callback(new Error("reload error"))
		})
	}
	this.getData = () => {
		return data
	}
}

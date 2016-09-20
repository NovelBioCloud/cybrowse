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
	this.load = (callback, emitEvent = true) => {
		dataService.load().then((_data) => {
			data = _data
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
	this.getData = () => {
		return data
	}
	this.getProperties = () => {
		console.log(data)
		if (!data) {
			return []
		} else {
			let propertySet = new Set()
			data.forEach((item) => {
				Object.keys(item.data).forEach((property) => {
					propertySet.add(property)
				})
			})
			return [...propertySet]
		}
	}
	this.getValuesByProperty = (property) => {
		if (!data || data === '') {
			return []
		} else {
			let valueSet = new Set()
			data.forEach((item) => {
				// 为了提高效率，此处假设外部传入的property属性一定是存在的
				// if (_.includes(_.keys(item.data), property)) {
				// 	valueSet.add(item[property] || "")
				// }
				valueSet.add(item.data[property] || "")
			})
			return [...valueSet]
		}
	}
}

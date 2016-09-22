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
	try {
		let cybrowseData = JSON.parse(localStorage.getItem("cybrowse-data"))
		data = cybrowseData.elements
		data.styles = cybrowseData.style
	} catch (e) {
		data = {
			nodes: [],
			edges: [],
			styles: []
		}
	}

	this.load = (callback, emitEvent = true) => {
		dataService.load().then((_data) => {
			data = _data
		}, () => {
			callback(new Error("reload error"))
		})
	}
	this.getData = () => {
		return data
	}
	this.getProperties = () => {
		if (!data) {
			return []
		} else {
			let propertySet = new Set()
			data.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
				Object.keys(item.data).forEach((property) => {
					propertySet.add(property)
				})
			})
			return [...propertySet]
		}
	}
	this.getValuesByProperty = (property) => {
		if (!property || property === '') {
			return []
		} else {
			let valueSet = new Set()
			data.nodes.filter((item) => {
				return item.group === 'nodes'
			}).forEach((item) => {
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

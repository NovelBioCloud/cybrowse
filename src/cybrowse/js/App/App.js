import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import async from 'async'
import assert from 'assert'
import {
	newError
} from '../util'
import Loading from './Loading'
import Main from './Main'
import toastr from 'toastr'
export default class App {
	constructor(appElement) {
		assert(appElement, "appElement can not be null!")
		this.appElement = appElement
		this._init()
	}
	_init() {
		async.series([(callback) => {
			this._renderLoading(callback)
    }, (callback) => {
			this._loadDefaultConfig(callback)
    }, (callback) => {
			this._render(callback)
    }], (err, results) => {
			if (err) {
				alert(err)
			} else {
				toastr.success("加载成功")
			}
		})
	}
	_renderLoading(callback) {
		ReactDom.render( < Loading / > , this.appElement, () => {
			callback()
		})
	}
	_render(callback) {
		ReactDom.render( < Main defaultConfig = {
				this.defaultConfig
			} />,this.appElement, ()=>{
			callback()
		})
  }
  _loadDefaultConfig(callback) {
  	$.getJSON("data/config.json").then((data) => {
  		this.defaultConfig = data
  		callback()
  	}, () => {
  		callback(newError())
  	})
  }
  rerender() {
  	this._init()
  }
}

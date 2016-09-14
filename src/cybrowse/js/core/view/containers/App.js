import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import toastr from 'toastr'
import async from 'async'
import assert from 'assert'
import {
  eventDispatcher,
} from '../../service'
import AppComponent from './AppComponent'

/** 试图入口函数 **/
export default class App {
	constructor(element, callback) {
		assert(element, 'element can not be null!')
		assert(!callback || _.isFunction(callback), 'callback must be a function!')
		ReactDom.render( < AppComponent />, element, () => { callback && callback() } )
	}
}

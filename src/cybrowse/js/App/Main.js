import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import async from 'async'
import assert from 'assert'
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import {
	connect,
	Provider
} from 'react-redux'
import {
	RootModuleFactory
} from './modules'

export default class Main extends Component {
	constructor(props, context) {
		super(props, context)
	}
	render() {
		const rootModuleFactory = new RootModuleFactory(this.props.defaultConfig)
		const TempModule = rootModuleFactory.getInstance()
		return (
			<TempModule/>
		)
	}
}

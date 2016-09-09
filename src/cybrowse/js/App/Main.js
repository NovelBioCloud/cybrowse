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
import TempModuleFactory from './TempModuleFactory'

export default class Main extends Component {
	constructor(props, context) {
		super(props, context)
		this.defaultConfig = this.props.defaultConfig
	}
	render() {
		const tempModuleFactory = new TempModuleFactory(this.defaultConfig)
		let TempModule = tempModuleFactory.getInstance()
		return (
			<div>
				<TempModule/>
				<TempModule/>
			</div>
		)
	}
}

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
	createStore,
	combineReducers,
	bindActionCreators,
	applyMiddleware
} from 'redux'
import {
	connect,
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import {
  eventDispatcher,
} from '../../service'
import DefaultConfig from './DefaultConfig'
import DevTools from './DevTools'
import {
	store
} from '../store'

export default class AppComponent extends Component {
	constructor(props, context) {
		super(props, context)
		this.initState()
	}
	initState() {
		this.state = {
			view: 'loading'
		}
	}
	render() {
    switch (this.state.view) {
      case 'loading':
        return this.renderLoading()
      default:
        return this.renderInitialized()
    }
	}
	renderLoading() {
		return <div>正在加载数据。。。</div>
	}
	renderInitialized() {
		this.initStore()
		return (
			<Provider store={ this.getStore() }>
				<div>
					<DefaultConfig/>
				</div>
			</Provider>
		)
	}
	componentDidMount() {
		this.setState({
			view: 'initialized'
		}, () => {
			toastr.success('加载成功')
		})
	}
	getStore() {
		return this.store
	}
	initStore() {
		this.store = store
		this.store.subscribe(()=>{
			eventDispatcher.channel().publish('store.refresh', {})
		})
	}
}

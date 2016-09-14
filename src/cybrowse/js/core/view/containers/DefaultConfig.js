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
import {
  store,
} from '../../store'
import {
  DefaultConfigActions
} from '../actions'
import Data from './Data'

/** 试图入口函数 **/
class DefaultConfig extends Component {
  componentDidMount() {
    this.loadDefaultConfig();
  }
  loadDefaultConfig() {
    $.getJSON('data/data.json').then((data)=>{
      this.props.loadDefaultConfig(data)
    })
  }
  renderLoading() {
    return (
      <div></div>
    )
  }
  renderInitialized() {
    return (
      <Data/>
    )
  }
  render() {
    if (!this.props.defaultConfig) {
      return this.renderLoading()
    } else {
      return this.renderInitialized()
    }
  }
}

function mapStateToProps(state) {
  return {
    defaultConfig: state.defaultConfig
  }
}

function mapActionToProps(dispatch, state) {
  return {
    loadDefaultConfig: bindActionCreators(DefaultConfigActions.loadDefaultConfig, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(DefaultConfig)

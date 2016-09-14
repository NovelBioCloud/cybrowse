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
  DataActions
} from '../actions'

class Toolbar extends Component {
  componentDidMount() {
    this.loadDefaultConfig();
  }
  loadDefaultConfig() {
    $.getJSON('data/data.json').then((data)=>{
      this.props.loadData(data)
    })
  }
  renderLoading() {
    return (
      <div></div>
    )
  }
  renderInitialized() {
    return (
      <div>toolbar</div>
    )
  }
  render() {
    if (!this.props.data.data) {
      return this.renderLoading()
    } else {
      return this.renderInitialized()
    }
  }
}
Toolbar.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    data: state.data
  }
}
function mapActionToProps(dispatch, state) {
  return {
    loadData: bindActionCreators(DataActions.loadData, dispatch),
		dispatch: dispatch
  }
}
export default connect(
  mapStateToProps,
  mapActionToProps
)(Toolbar)

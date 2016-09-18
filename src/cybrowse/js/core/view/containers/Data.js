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
import MainView from './MainView'

class Data extends Component {
  componentDidMount() {
    this.loadData();
  }
  loadData() {
		let dataString = localStorage.getItem("cytoscape-data") ;
		let data = {}
		if (dataString) {
			try {
				data = JSON.parse(dataString)
			} catch (e) { }
		}
		localStorage.setItem("cytoscape-data", JSON.stringify(data)) ;
		this.props.loadData(data)
  }
  renderLoading() {
    return (
      <div></div>
    )
  }
  renderInitialized() {
    return (
      <MainView/>
    )
  }
  render() {
    if (!this.props.data) {
      return this.renderLoading()
    } else {
      return this.renderInitialized()
    }
  }
}
Data.propTypes = {
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
)(Data)

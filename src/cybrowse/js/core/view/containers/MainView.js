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
import Toolbar from './Toolbar'

class MainView extends Component {
  componentDidMount() {
    this.loadDefaultConfig();
  }
  loadDefaultConfig() {
    $.getJSON('data/data.json').then((data)=>{
      this.props.loadData(data)
    })
  }
  renderInitialized() {
    return (
      <div className='class-main-view'>
				<div className='main-view-top'>
					<Toolbar/>
				</div>
				<div className='main-view-content'>
					<div className='main-view-left'>1</div>
					<div className='main-view-right'>2</div>
				</div>
			</div>
    )
  }
  render() {
    return this.renderInitialized()
  }
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired
	}
}
function mapStateToProps(state) {
	let {
		customNetworkConfig,
		computedNetworkConfig,
		customNodeConfig,
		computedNodeConfig,
		customEdgeConfig,
		computedEdgeConfig,
	} = state;
	return {
		customNetworkConfig,
		computedNetworkConfig,
		customNodeConfig,
		computedNodeConfig,
		customEdgeConfig,
		computedEdgeConfig,
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
)(MainView)

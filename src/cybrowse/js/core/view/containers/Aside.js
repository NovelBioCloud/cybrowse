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
import cytoscape from 'cytoscape'
import {
	eventDispatcher,
} from '../../service'
import {
	DataActions
} from '../actions'

class Aside extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			view: 'initial'
		}
	}
	componentDidMount() {
		this.subscribe()
	}
	componentWillUnmount() {
		this.unsubscribe()
	}
	subscribe() {
		postal.channel().subscribe('cytoscapeInstance.change', (cytoscapeInstance) => {
			this.cytoscapeInstance = cytoscapeInstance
			this.setState({
				view: 'initialized'
			})
		})
	}
	unsubscribe() {

	}
	renderInitial() {
		return (
			<div></div>
		)
	}
	renderInitialized() {
		return (
			<div style = {{}} >
			< /div>
		)
	}
	render() {
		if (this.state.view === 'initial') {
			return this.renderInitial()
		} else {
			return this.renderInitialized()
		}
	}
}
Aside.propTypes = {
	dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		data: state.data,
		computedNetworkConfig: state.computedNetworkConfig,
		computedNodeConfig: state.computedNodeConfig,
		computedEdgeConfig: state.computedEdgeConfig,
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
	mapActionToProps,
	null,
	{
		withRef: true
	}
)(Aside)

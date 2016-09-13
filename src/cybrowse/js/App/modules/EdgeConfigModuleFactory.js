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
	bindActionCreators,
	applyMiddleware
} from 'redux'
import {
	connect,
	Provider
} from 'react-redux'

export default class EdgeConfigModuleFactory {
	constructor(props = {}) {
		this.props = props;
	}
	getReducer() {
		return (state, action) => {
			switch (action.type) {
			case "edgeConfig.refresh":
				return {
					...state,
					time: Date.now()
				}
			case "edgeConfig.reset":
				return {
					...state,
					time: 0
				}
			default:
				return {
					...state
				}
			}
		}
	}
	getDefaultInstance() {
		return connect(this._mapStateToProps(), this._mapDispatchToProps())(this._getDefaultCommponent())
	}
	getAnotherInstance() {
		return connect(this._mapStateToProps(), this._mapDispatchToProps())(this._getAnotherCommponent())
	}
	_getAnotherCommponent() {
		class View extends Component {
			render() {
				return (
					<div>
						<div>{this.props.edgeConfig.time}</div>
						<button onClick={()=>{
							this.props.reset()
						}}>reset</button>
					</div>
				)
			}
		}
		return View;
	}
	_getDefaultCommponent() {
		class View extends Component {
			render() {
				return (
					<div>
						<div>{this.props.edgeConfig.time}</div>
						<button onClick={()=>{
							this.props.refresh()
						}}>refresh</button>
					</div>
				)
			}
		}
		return View;
  }
	_mapStateToProps() {
		return (state) => {
			return {
				edgeConfig: state.edgeConfig
			}
		}
	}
	_mapDispatchToProps() {
		return (dispatch) => {
			return bindActionCreators(this._getActions(), dispatch)
		}
	}
  _getActions() {
    return {
    	refresh: data => {
    		return {
    			type: 'edgeConfig.refresh',
    			time: Date.now()
    		}
    	},
			reset: data => {
    		return {
    			type: 'edgeConfig.reset',
    			time: 0
    		}
    	}
    }
  }
}

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

export default class DefaultConfigModuleFactory {
	constructor(props = {}) {
		this.props = props;
	}
	getReducer() {
		return (state, action) => {
			switch (action.type) {
			case "defaultConfig.refresh":
				return {
					...state,
				}
			case "defaultConfig.reset":
				return {
					...state,
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
	_getDefaultCommponent() {
		class View extends Component {
			render() {
				return (
					<div>
						<div>{this.props.defaultConfig}</div>
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
				defaultConfig: state.defaultConfig
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
    			type: 'defaultConfig.refresh',
    		}
    	},
			reset: data => {
    		return {
    			type: 'defaultConfig.reset',
    		}
    	}
    }
  }
}

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

class TimerModuleFactory {
	constructor(props = {}) {
		this.props = props;
	}
	getReducer() {
		let {
			time = 0
		} = this.props;
		return (state, action) => {
			switch (action.type) {
			case "timer.refresh":
				return {
					...state,
					time: Date.now()
				}
			case "timer.reset":
				return {
					...state,
					time: action.time
				}
			default:
				return {
					time: time
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
						<div>{this.props.timer.time}</div>
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
						<div>{this.props.timer.time}</div>
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
				timer: state.timer
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
    			type: 'timer.refresh',
    			time: Date.now()
    		}
    	},
			reset: data => {
    		return {
    			type: 'timer.reset',
    			time: 0
    		}
    	}
    }
  }
}

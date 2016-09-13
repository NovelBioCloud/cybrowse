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
import postal from 'postal'
import polyfill from 'babel-polyfill'
let i=0;
export default class DataModuleFactory {
	constructor(props = {}) {
		this.props = props;
	}
	getReducer() {
		return (state, action) => {
			switch (action.type) {
			case "data.reload":
				postal.channel().publish('data.reload', action.data);
				return {
					...state,
					data: action.data
				}
			case "data.refresh":
				postal.channel().publish('data.reload');
				return {
					...state,
					data: []
				}
			case "data.reset":
				postal.channel().publish('data.reset');
				return {
					...state,
					data: []
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
			componentDidMount() {
			}
			render() {
				return (
					<div>
						<div></div>
						<button onClick={()=>{
							this.props.refresh()
						}}>refresh</button>
						<button onClick={()=>{
							this.props.reload()
						}}>load</button>
					</div>
				)
			}
		}
		return View;
  }
	_mapStateToProps() {
		return (state) => {
			return {
				data: state.data
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
			reload: function(data) {
				return (dispatch) => {
					$.getJSON('data/data.json').then((data) => {
						dispatch({
							type: 'data.reload',
							data: data
						})
					})
				}
			},
    	refresh: data => {
    		return {
    			type: 'data.refresh',
    		}
    	},
			reset: data => {
    		return {
    			type: 'data.reset',
    		}
    	}
    }
  }
}

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
import _ from 'lodash'
import cytoscape from 'cytoscape'

export default class CytoscapeModuleFactory {
	constructor(props = {}) {
		this.props = props;
	}
	getReducer() {
		return (state, action) => {
			switch (action.type) {
			case "data.reload":
				return {
					...state
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
		return CytoscapeView
  }
	_mapStateToProps() {
		return (state) => {
			return {
				defaultConfig: state.defaultConfig,
				data: state.data,
			}
		}
	}
	_mapDispatchToProps() {
		return (dispatch) => {
			return bindActionCreators(this._getActions(), dispatch)
		}
	}
  _getActions() {
    return {}
  }
}
class CytoscapeView extends Component {
	_reload(data) {
		this.cy.remove(this.cy.elements());
		this.cy.add(data)
	}
	componentDidMount() {
		this.reloadSubscription = postal.channel().subscribe('data.reload', (data)=>{
			this._reload(data);
		});
		this.cy = cytoscape({
			container: this.refs.cytoscape,
			elements: [],
			style: [{
				selector: 'node',
				style: {
					'background-color': '#666',
					'label': 'data(id)'
				}
		  }, {
				selector: 'edge',
				style: {
					'width': 3,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle'
				}
		  }],
			layout: {
				name: 'grid',
				rows: 1
			}
		});
		$(window).on('resize', ()=>{ this._resize() })
	}
	componentWillUnmount() {
		$(window).off('resize', this._resize())
		this.reloadSubscription.unsubscribe()
	}
	_resize() {
		this.cy.resize()
	}
	render() {
		return (
			<div className="class-cytoscape-view">
				<div className='cytoscape-view-container' ref='cytoscape'></div>
			</div>
		)
	}
}

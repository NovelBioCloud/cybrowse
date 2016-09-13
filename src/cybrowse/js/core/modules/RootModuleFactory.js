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
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import createLogger from 'redux-logger'
import Toolbar from './Toolbar'
import CytoscapeModuleFactory from './CytoscapeModuleFactory'
import DataModuleFactory from './DataModuleFactory'
import DefaultConfigModuleFactory from './DefaultConfigModuleFactory'
import NodeConfigModuleFactory from './NodeConfigModuleFactory'
import EdgeConfigModuleFactory from './EdgeConfigModuleFactory'
import NetworkConfigModuleFactory from './NetworkConfigModuleFactory'

export default class RootModuleFactory {
	constructor(defaultConfig) {
		assert(defaultConfig)
		this.defaultConfig = defaultConfig
		this._initFactory()
	}
	_initFactory() {
		let defaultConfigModuleFactory = new DefaultConfigModuleFactory(this.defaultConfig)
		let dataModuleFactory = new DataModuleFactory(this.defaultConfig)
		let nodeConfigModuleFactory = new NodeConfigModuleFactory(defaultConfigModuleFactory)
	 	let edgeConfigModuleFactory = new EdgeConfigModuleFactory(defaultConfigModuleFactory)
		let networkConfigModuleFactory = new NetworkConfigModuleFactory(defaultConfigModuleFactory)
		let cytoscapeModuleFactory = new CytoscapeModuleFactory(
			defaultConfigModuleFactory, nodeConfigModuleFactory,
			edgeConfigModuleFactory, networkConfigModuleFactory)
		this.factorys = {
			cytoscapeModuleFactory: cytoscapeModuleFactory,
			defaultConfigModuleFactory: defaultConfigModuleFactory,
			dataModuleFactory: dataModuleFactory,
			nodeConfigModuleFactory: nodeConfigModuleFactory,
		 	edgeConfigModuleFactory: edgeConfigModuleFactory,
			networkConfigModuleFactory: networkConfigModuleFactory,
		}
	}
  getStore() {
		const middleware = [ thunk, promise ]
		if (process.env.NODE_ENV !== 'production') {
		  // middleware.push(createLogger())
		}
  	let store = createStore(combineReducers({
  		defaultConfig: this.factorys.defaultConfigModuleFactory.getReducer(),
			data: this.factorys.dataModuleFactory.getReducer(),
			nodeConfig: this.factorys.nodeConfigModuleFactory.getReducer(),
			edgeConfig: this.factorys.edgeConfigModuleFactory.getReducer(),
			networkConfig: this.factorys.networkConfigModuleFactory.getReducer(),
			cytoscape: this.factorys.cytoscapeModuleFactory.getReducer(),
  	}), {
			defaultConfig: {time: 0},
			data: {data: []},
			nodeConfig: {time: 0},
			edgeConfig: {time: 0},
			networkConfig: {time: 0},
		}, applyMiddleware(...middleware))
		store.subscribe((...args)=>{
			console.log(store.getState())
		})
		return store
  }
	getRootContent() {
		return RootContent
	}
	getInstance() {
    let Content = this.getRootContent()
    return () => (
      <Provider store={ this.getStore() }>
        <Content factorys={this.factorys}/>
      </Provider>
    )
	}
}
class RootContent extends Component {
	constructor(props, context) {
		super(props, context)
	}
	render() {
		let {factorys} = this.props
		let NodeConfigModule = factorys.nodeConfigModuleFactory.getDefaultInstance()
		let EdgeConfigModule = factorys.edgeConfigModuleFactory.getDefaultInstance()
		let NetworkConfigModule = factorys.networkConfigModuleFactory.getDefaultInstance()
		let DefaultConfigModule = factorys.defaultConfigModuleFactory.getDefaultInstance()
		let CytoscapeModule = factorys.cytoscapeModuleFactory.getDefaultInstance()
		let DataModule = factorys.dataModuleFactory.getDefaultInstance()
		return (
			<div className="class-root-content">
				<div className="root-content-toolbar">
					<Toolbar>
					</Toolbar>
				</div>
				<div className="root-content-content root-content-layout">
					<div className="root-content-layout-aside">
						<div>
							<div>DefaultConfigModule</div>
							<DefaultConfigModule/>
							<div>DataModule</div>
							<DataModule/>
							<div>NodeConfigModule</div>
							<NodeConfigModule/>
							<div>EdgeConfigModule</div>
							<EdgeConfigModule/>
							<div>NetworkConfigModule</div>
							<NetworkConfigModule/>
						</div>
					</div>
					<div className="root-content-layout-article">
						<div className='cytoscape-view-wrap'>
							<CytoscapeModule/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Toolbar() {
	let _this = this
	let $container
	let $view
	let defaultConfig
	let cytoscape
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let base = getBase()
	this.init = (props) => {
		base.init(props)
	}
	this.getView = () => {
		return $view
	}
	this.setCytoscape = (cytoscape) => {
		base.setCytoscape(cytoscape)
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([
					(callback) => {
						dataService.init(props)
						dataService.loadDefaultConfig(callback)
          }, (callback) => {
						viewService.init()
						eventService.init()
						callback()
          }
        ])
			},
			setCytoscape: (_cytoscape) => {
				cytoscape = _cytoscape
				eventService.initialized()
			}
		}
	}

	function getDataService() {
		return {
			init: (props) => {
				$container = $(props.container)
			},
			loadDefaultConfig: (callback) => {
				$.getJSON('data/defaultConfig.json', (data) => {
					callback()
				})
			}

		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return viewService.getInitializedTemplate()
			},
			getInitializedTemplate: () => {
				return `<div>
					<nav class="navbar navbar-default" role="navigation">
					  <div class="container-fluid">
					    <!-- Brand and toggle get grouped for better mobile display -->
					    <div class="navbar-header">
					      <a class="navbar-brand" href="#">Cybrowse</a>
					    </div>
					    <!-- Collect the nav links, forms, and other content for toggling -->
					    <div>
					      <ul class="nav navbar-nav">
					        <li class="active"><a href="#">Link</a></li>
					        <li><a href="#">Link</a></li>
					        <li class="dropdown">
					          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
					          <ul class="dropdown-menu" role="menu">
					            <li><a href="#">Action</a></li>
					            <li><a href="#">Another action</a></li>
					            <li><a href="#">Something else here</a></li>
					            <li class="divider"></li>
					            <li><a href="#">Separated link</a></li>
					            <li class="divider"></li>
					            <li><a href="#">One more separated link</a></li>
					          </ul>
					        </li>
					      </ul>
					      <ul class="nav navbar-nav navbar-right">
					        <li><a href="#">Link</a></li>
					        <li class="dropdown">
					          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
					          <ul class="dropdown-menu" role="menu">
					            <li><a href="#">Action</a></li>
					            <li><a href="#">Another action</a></li>
					            <li><a href="#">Something else here</a></li>
					            <li class="divider"></li>
					            <li><a href="#">Separated link</a></li>
					          </ul>
					        </li>
					      </ul>
					    </div><!-- /.navbar-collapse -->
					  </div><!-- /.container-fluid -->
					</nav>
				</div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.empty()
				$container.append($view)
			},
			initialized: () => {
				$view = $(viewService.getInitializedTemplate())
				$container.empty()
				$container.append($view)
			}
		}
	}

	function getEventService() {
		return {
			init: () => {
				postal.channel().subscribe('defaultConfig.reload', () => {
					base.reloadDefaultConfig()
				})
			},
			initialized: () => {
			}
		}
	}


}

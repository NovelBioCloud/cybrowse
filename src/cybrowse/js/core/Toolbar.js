import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Toolbar() {
	let _this = this
	let props
	let $container
	let $view
	let cytoscape
	let dataService = getDataService()
	let viewService = getViewService()
	let base = getBase()
	let manager
	this.init = (props) => {
		base.init(props)
	}
	this.getView = () => {
		return $view
	}

	function getBase() {
		return {
			init: (props) => {
				dataService.init(props)
				viewService.init()
			},
			onLoadLocalStorageData: () => {
				props.service.onLoadLocalStorageData()
			},
			save: () => {
				props.service.save()
			}
		}
	}

	function getDataService() {
		return {
			init: (_props) => {
				props = _props
				$container = props.container
				manager = props.manager
			},
		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div>
					<nav class="navbar navbar-default" role="navigation">
					  <div class="container-fluid">
					    <div class="navbar-header">
					      <a class="navbar-brand" href="#">Cybrowse</a>
					    </div>
					    <div>
					      <ul class="nav navbar-nav">
					        <li class="dropdown">
					          <a href="#" class="dropdown-toggle" data-toggle="dropdown">文件<span class="caret"></span></a>
					          <ul class="dropdown-menu" role="menu">
											<li><a href="#" class='fn-toolbar-clear-data'>新建</a></li>
											<li><a href="#" class='fn-toolbar-clear-local'>清楚缓存</a></li>
					            <li><a href="#" class='fn-toolbar-load-local-data'>加载本地数据</a></li>
					            <li><a href="#" class='fn-toolbar-save-data'>保存到本地</a></li>
											<li><a href="#" class='fn-toolbar-save-as'>保存为...</a></li>
					            <li class="divider"></li>
					            <li><a href="#">退出</a></li>
					          </ul>
					        </li>
					      </ul>
					      <ul class="nav navbar-nav navbar-right">
					        <li><a href="#">Link</a></li>
					        <li class="dropdown">
					          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
					          <ul class="dropdown-menu" role="menu">
					            <li><a href="#">登陆</a></li>
					            <li><a href="#">退出</a></li>
					          </ul>
					        </li>
					      </ul>
					    </div>
					  </div>
					</nav>
				</div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.append($view)
				$view.find('.fn-toolbar-save-data').click(function () {
					base.save()
				})
				$view.find('.fn-toolbar-load-local-data').click(() => {
					base.onLoadLocalStorageData()
				})
			},
		}
	}




}

import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Background from './nodeEditors/Background'

export default function NodeEditor() {
	let _this = this
	let props
	let $container
	let $view
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	this.init = (props) => {
		base.init(props)
	}
	this.getView = () => {
		return base.getView()
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([(cb) => {
					dataService.init(props)
					cb()
        }, (cb) => {
					viewService.init()
					cb()
        }], (err) => {

				})
			},
			getView: () => {
				return $view
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
			}
		}
	}

	function getViewService() {
		return {
			init: () => {
				viewService.render()
			},
			render: () => {
				$view = $(viewService.getTemplate())
				$container = props.container
				$container.empty().append($view)
				let background = new Background()
				background.init({
					container: $view.find('.fn-background-wrap'),
					manager: props.manager
				})
			},
			getTemplate: () => {
				return `<div>
          <div class='fn-background-wrap'></div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {}
	}
}

import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Background() {
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
			},
			getTemplate: () => {
				return `<div>
          <div>
						<label>背景颜色</label>
					</div>
          <div><label>默认</label>
					<div>
						<label>属性</label>
						<select>
							<option>---</option>
							<option>temp</option>
						</select>
					</div>
					<div>
						<label>设置</label>
					</div>
					<div>
						<div class='fn-mapping-editor'/>
					</div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {}
	}
}

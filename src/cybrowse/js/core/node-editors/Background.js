import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Column from './Column'
import MappingType from './MappingType'
import MappingContent from './MappingContent'

export default function Background() {
	let _this = this
	let props
	let $container
	let $view
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return base.getView()
	}
	this.getPropertyName = function () {
		return 'background'
	}
	this.show = function () {
		base.show()
	}
	this.hide = function () {
		base.hide()
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				eventService.init()
			},
			getView: function () {
				return $view
			},
			show: function () {
				$view.removeClass("hidden")
			},
			hide: function () {
				$view.addClass("hidden")
			},
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
				let template = _.template(viewService.getTemplate())({
					defaultValue: '123',
					customValue: '',
				})
				$view = $(template)
				$container = props.container
				$container.append($view)
				let column = new Column()
				let mappingType = new MappingType()
				let mappingContent = new MappingContent()
				column.init({
					container: $view.find('.fn-background-column-wrap'),
					onChange: () => {
						mappingContent.update()
					},
					manager: manager
				})
				mappingType.init({
					container: $view.find('.fn-background-mapping-type-wrap'),
					onChange: () => {
						mappingContent.update()
					},
					manager: manager
				})
				mappingContent.init({
					container: $view.find('.fn-background-mapping-content-wrap'),
					column: column,
					mappingType: mappingType,
					manager: manager
				})
			},
			getTemplate: () => {
				return `<div>
          <div>
						<label>背景颜色</label>
					</div>
          <div>
						<div class='input-group'>
							<span class='input-group-addon'>默认</span>
							<input class='form-control' type='text' value='<%=defaultValue%>' disabled/>
						</div>
					</div>
					<div>
						<div class=''>自定义</div>
						<div>
							<div class='fn-background-column-wrap'>column</div>
							<div class='fn-background-mapping-type-wrap'>mapping-type</div>
							<div class='fn-background-mapping-content-wrap'>mapping-content</div>
						</div>
					</div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {
			init: () => {}
		}
	}
}

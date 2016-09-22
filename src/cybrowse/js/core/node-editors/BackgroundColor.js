import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Column from './Column'
import MappingType from './MappingType'
import MappingContent from './MappingContent'

export default function BackgroundColor() {
	let _this = this
	let props
	let $container
	let $view
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let manager
	let cytoscapeInstance
	let context
	this.init = function (props, context) {
		base.init(props, context)
	}
	this.getView = function () {
		return base.getView()
	}
	this.getPropertyName = function () {
		return 'background-color'
	}
	this.show = function () {
		base.show()
	}
	this.hide = function () {
		base.hide()
	}

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
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
			render: function () {
				viewService.render()
			},
			updateCytoscape: function (property, mappingValue, value) {
				cytoscapeInstance = context.get('cytoscapeInstance')
				console.log(cytoscapeInstance)
				cytoscapeInstance.batch(function () {
					cytoscapeInstance.style().selector(`node[${property}='${mappingValue}']`).style({
						'background-color': value
					}).update()
				})

			}
		}
	}

	function getDataService() {
		return {
			init: function (_props, _context) {
				props = _props
				context = _context
				$container = props.container
				manager = props.manager
				cytoscapeInstance = props.cytoscapeInstance
			}
		}
	}

	function getViewService() {
		return {
			init: () => {
				viewService.render()
			},
			render: () => {
				if ($view) {
					$view.remove()
				}
				let template = _.template(viewService.getTemplate())({
					defaultValue: '',
					customValue: '',
				})
				$view = $(template)
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
					manager: manager,
					onChange: (mappingValue, value) => {
						let property = column.getValue()
						base.updateCytoscape(property, mappingValue, value)
					}
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
							<div class='fn-background-column-wrap'></div>
							<div class='fn-background-mapping-type-wrap'></div>
							<div class='fn-background-mapping-content-wrap'></div>
						</div>
					</div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {
			init: () => {
				postal.channel().subscribe('dataManager.load', () => {
					base.render()
				})
			}
		}
	}
}

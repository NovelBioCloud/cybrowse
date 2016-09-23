import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function PropertySelector() {
	let _this = this,
		$container, props, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		properties,
		onChange,
		cytoscapeInstance,
		propertyEditors = new Map(),
		context
	this.init = function (props, context) {
		base.init(props, context)
	}
	this.getView = function () {
		return viewService.getView()
	}

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
				viewService.init()
				eventService.init()
			},
			onChange: function (property, selected) {
				console.log(property)
				onChange && onChange(property.name, selected)
			},
			showAll: function () {
				propertyEditors.forEach(item => {
					item.show()
				})
			},
			hideAll: function () {
				propertyEditors.forEach(item => {
					item.hide()
				})
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props, _context) {
				props = _props
				context = _context
				onChange = props.onChange
				$container = props.container
				properties = props.properties || [{
					name: 'background-color',
					displayName: '背景',
				}, {
					name: 'width',
					displayName: '宽',
				}, {
					name: 'height',
					displayName: '高',
				}]
				cytoscapeInstance = props.cytoscapeInstance
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
					<div class="btn-group btn-group-sm">
						<div class="btn-group btn-group-sm">
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
								自定义
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu fn-property-selector-content" role="menu">
							</ul>
						</div>
						<button type="button" class="btn btn-default fn-property-selector-show-all hidden">
							<i class='fa fa-fw fa-angle-double-left'></i>
						</button>
						<button type="button" class="btn btn-default fn-property-selector-hide-all">
							<i class='fa fa-fw fa-angle-double-down'></i>
						</button>
					</div>
        </div> `
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.append($view)
				properties.forEach((property) => {
					let propertySelectorUnit = new PropertySelectorUnit()
					propertySelectorUnit.init({
						container: $view.find('.fn-property-selector-content'),
						property: property,
						cytoscapeInstance: cytoscapeInstance,
						onChange: (property, selected) => {
							base.onChange(property, selected)
						},
						selected: true
					})
					propertyEditors.set(property.name, propertySelectorUnit)
				})
			},
			getView: function () {
				return $view
			}
		}
	}

	function getEventService() {
		return {
			init: function () {
				$view.find('.fn-property-selector-show-all').click(() => {
					base.showAll()
					$view.find('.fn-property-selector-show-all').addClass('hidden')
					$view.find('.fn-property-selector-hide-all').removeClass('hidden')
					$view.find('.fn-property-selector-show-all').insertBefore($view.find('.fn-property-selector-hide-all'))
				})
				$view.find('.fn-property-selector-hide-all').click(() => {
					base.hideAll()
					$view.find('.fn-property-selector-hide-all').addClass('hidden')
					$view.find('.fn-property-selector-show-all').removeClass('hidden')
					$view.find('.fn-property-selector-hide-all').insertBefore($view.find('.fn-property-selector-show-all'))
				})
			}
		}
	}


}

function PropertySelectorUnit() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		selected = true,
		property,
		onChange
	this.init = function (props) {
		base.init(props)
	}
	this.show = function () {
		base.show()
	}
	this.hide = function () {
		base.hide()
	}
	this.isSelected = function () {
		return selected
	}
	this.getProperty = function () {
		return property
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				$view.click(() => {
					base.toggle()
				})
			},
			toggle: function () {
				selected = !selected
				viewService.repaintFlag()
				onChange && onChange(property, selected)
			},
			show: function () {
				if (!selected) {
					base.toggle()
				}
			},
			hide: function () {
				if (!!selected) {
					base.toggle()
				}
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
				property = props.property
				$container = props.container
				selected = !!props.selected
				onChange = props.onChange
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<li class='fn-property'>
					<a href="#">
						<span><i class='fa fa-check fa-fw fn-flag'></i>&nbsp;&nbsp;<%=property.displayName%><span>
					</a>
				</li>`
			},
			init: function () {
				$view = $(_.template(viewService.getTemplate())({
					property: property
				}))
				$container.append($view)
				viewService.repaintFlag()
			},
			repaintFlag: function () {
				if (selected) {
					$view.find('.fn-flag').css('visibility', 'visible')
				} else {
					$view.find('.fn-flag').css('visibility', 'hidden')
				}
			}
		}
	}

	function getEventService() {
		return {

		}
	}
}

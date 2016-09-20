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
		propertyEditors = new Map()
	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return viewService.getView()
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				eventService.init()
			},
			onChange: function (property, selected) {
				onChange && onChange(property, selected)
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
			init: function (_props) {
				props = _props
				onChange = props.onChange
				$container = props.container
				properties = props.properties || ['background', 'width', 'height']
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
					<div class='fn-property-selector-show-all'>全部显示</div>
					<div class='fn-property-selector-hide-all'>全部隐藏</div>
          <div class='fn-property-selector-content'></div>
        </div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.append($view)
				properties.forEach((item) => {
					let propertyEditor = new Property()
					propertyEditor.init({
						container: $view.find('.fn-property-selector-content'),
						property: item,
						onChange: (selected) => {
							base.onChange(item, selected)
						},
						selected: true
					})
					propertyEditors.set(item, propertyEditor)
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
				})
				$view.find('.fn-property-selector-hide-all').click(() => {
					base.hideAll()
				})
			}
		}
	}


}

function Property() {
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
				onChange && onChange(selected)
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
				return `<div class='fn-property'><i class='fn-flag'>flag</i>|${property}</div>`
			},
			init: function () {
				$view = $(viewService.getTemplate())
				$container.append($view)
				viewService.repaintFlag()
			},
			repaintFlag: function () {
				if (selected) {
					$view.find('.fn-flag').removeClass('hidden')
				} else {
					$view.find('.fn-flag').addClass('hidden')
				}
			}
		}
	}

	function getEventService() {
		return {

		}
	}
}

import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import PropertySelector from './node/PropertySelector'
import PropertyEditor from './node/PropertyEditor'

export default function NodeEditor() {
	let _this = this
	let props
	let $container
	let $view
	let manager
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let cytoscapeInstance
	let context
	this.init = (props, context) => {
		base.init(props, context)
	}
	this.getView = () => {
		return base.getView()
	}
	function getBase() {
		return {
			init: (props, context) => {
				dataService.init(props, context)
				viewService.init()
			},
			getView: () => {
				return $view
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
				$view = $(viewService.getTemplate())
				$container.append($view)
				let propertySelector = new PropertySelector()
				let propertyEditor = new PropertyEditor()
				propertySelector.init({
					container: $view.find('.fn-property-selector-wrap'),
					cytoscapeInstance: cytoscapeInstance,
					onChange: (property, selected) => {
						propertyEditor.rerenderEditor(property, selected)
					}
				}, context)
				propertyEditor.init({
					container: $view.find('.fn-property-editor-wrap'),
					manager: manager,
					cytoscapeInstance: cytoscapeInstance
				}, context)
			},
			getTemplate: () => {
				return `<div>
					<div class='fn-property-selector-wrap'></div>
          <div class='fn-property-editor-wrap'></div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {}
	}
}

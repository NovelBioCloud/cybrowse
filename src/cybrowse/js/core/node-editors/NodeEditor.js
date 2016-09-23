import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import PropertySelector from './PropertySelector'
import PropertyEditor from './PropertyEditor'

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
	this.init = (props) => {
		base.init(props)
	}
	this.getView = () => {
		return base.getView()
	}
	function getBase() {
		return {
			init: (props) => {
				dataService.init(props)
				viewService.init()
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
				})
				propertyEditor.init({
					container: $view.find('.fn-property-editor-wrap'),
					manager: manager,
					cytoscapeInstance: cytoscapeInstance
				})
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

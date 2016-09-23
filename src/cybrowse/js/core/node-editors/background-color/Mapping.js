import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import MappingColumn from './MappingColumn'
import MappingType from './MappingType'
import MappingContent from './MappingContent'

export default function Mapping() {
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

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
				viewService.init()
			},
			getView: function () {
				return $view
			},
		}
	}

	function getDataService() {
		return {
			init: function (_props, _context) {
				props = _props
				context = _context
				$container = props.container
				manager = props.manager
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
				let template = _.template(viewService.getTemplate())({})
				$view = $(template)
				$container.append($view)
				let mappingColumn = new MappingColumn()
				let mappingType = new MappingType()
				let mappingContent = new MappingContent()
				mappingColumn.init({
					container: $view.find('.fn-background-mapping-column-wrap'),
					value: '',
					onChange: () => {
						mappingContent.update()
					},
					manager: manager
				})
				mappingType.init({
					container: $view.find('.fn-background-mapping-type-wrap'),
					value: '',
					onChange: () => {
						mappingContent.update()
					},
					manager: manager
				})
				mappingContent.init({
					container: $view.find('.fn-background-mapping-content-wrap'),
					mappingColumn: mappingColumn,
					mappingType: mappingType,
					manager: manager,
					value: {},
					onChange: (mappingValue, value) => {
						let property = mappingColumn.getValue()
						base.updateCytoscape(property, mappingValue, value)
					}
				})
			},
			getTemplate: () => {
				return `<div>
          <div>default value <i class='fa fa-angle-double-down '></i></div>
					<div>
            <div>
						  <div class='fn-background-mapping-column-wrap'></div>
						  <div class='fn-background-mapping-type-wrap'></div>
						  <div class='fn-background-mapping-content-wrap'></div>
            </div>
            <div>
              <button class='btn btn-sm'>
                <i class='fa fa-fw fa-trash'></i>
              </button>
            </div>
					</div>
        </div>`
			}
		}
	}

	function getEventService() {
		return {}
	}
}

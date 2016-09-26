import _ from 'lodash'
import $ from 'jquery'
import configs from './common/configs'
export default function ConfigSelector() {
	let _this = this,
		$container, $view, props
	let manager
	this.init = function (props) {
		init(props)
	}

	/** base **/
	function init(props) {
		data_init(props)
		view_init()
	}

	function onConfigChange(value) {
		props.onConfigChange && props.onConfigChange(value)
	}
	/** service **/
	function data_init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
	}
	/** view **/
	function view_init() {
		let template = view_getTemplate()
		let layout = configs.style.map((item) => {
			return {
				value: item.name,
				name: item.name
			}
		})
		$view = $(_.template(template)({
			layout: layout
		}))
		$container.append($view)
		let configManager = manager.getConfigManager()
		let config = configManager.getData()
		let defaultStyle = config.defaultStyle
		if (defaultStyle && defaultStyle.name) {
			$view.find('.fn-column-select').val(defaultStyle.name)
		}
		$view.find('.fn-column-select').change((event) => {
			onConfigChange($(event.target).val())
		})
	}

	function view_getTemplate() {
		return `
      <div>
        <select class='fn-column-select form-control input-sm'>
          <option></option>
        <% _.each(layout,(item)=>{ %>
          <option value='<%=item.value%>'><%=item.name%></option>
        <% })%>
        </select>
      </div>
    `
	}
}

import _ from 'lodash'
import $ from 'jquery'
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
	function onConfigChange(value){
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
		let configs = manager.getConfigs()
		$view = $(_.template(template)({
			configs
		}))
		$container.append($view)
		$view.find('.fn-column-select').change((event) => {
			onConfigChange($(event.target).val())
		})
	}

	function view_getTemplate() {
		return `
      <div>
        <select class='fn-column-select form-control input-sm'>
          <option>----</option>
        <% _.each(configs,(config)=>{ %>
          <option><%=config.name%></option>
        <% })%>
        </select>
      </div>
    `
	}
	/** event **/
	function event_init() {

	}
}

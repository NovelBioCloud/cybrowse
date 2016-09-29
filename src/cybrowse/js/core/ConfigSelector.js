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

	function onStyleChange(value) {
		props.onStyleChange && props.onStyleChange(value)
	}

	function onLayoutChange(value) {
		props.onLayoutChange && props.onLayoutChange(value)
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
		let preStyleConfigs = configs.style.map((item) => {
			return {
				value: item.name,
				name: item.name
			}
		})
		let preLayoutConfigs = configs.layout.map((item) => {
			return {
				value: item.name,
				name: item.name
			}
		})
		$view = $(_.template(template)({
			preStyleConfigs,
			preLayoutConfigs
		}))
		$container.append($view)
		let configManager = manager.getConfigManager()
		let config = configManager.getData()
		let defaultStyle = config.defaultStyle
		if (defaultStyle && defaultStyle.name) {
			$view.find('.fn-column-style-select').val(defaultStyle.name)
		}
		$view.find('.fn-column-style-select').change((event) => {
			onStyleChange($(event.target).val())
		})
		let defaultLayout = config.defaultLayout
		if (defaultLayout && defaultLayout.name) {
			$view.find('.fn-column-layout-select').val(defaultLayout.name)
		}
		$view.find('.fn-column-layout-select').change((event) => {
			onLayoutChange($(event.target).val())
		})
	}

	function view_getTemplate() {
		return `
      <div>
				<div class="panel panel-default">
				  <div class="panel-body">
						<div>
							<div>
								<label>全局样式</label>
							</div>
							<div>
								<select class='fn-column-style-select form-control input-sm'>
									<% _.each(preStyleConfigs,(item)=>{ %>
									<option value='<%=item.value%>'><%=item.name%></option>
									<% })%>
								</select>
							</div>
						</div>
						<div>
							<div>
								<label>布局</label>
							</div>
							<div>
								<select class='fn-column-layout-select form-control input-sm'>
									<% _.each(preLayoutConfigs,(item)=>{ %>
									<option value='<%=item.value%>'><%=item.name%></option>
									<% })%>
								</select>
							</div>
						</div>
				  </div>
				</div>
      </div>
    `
	}
}
import _ from 'lodash'
export default function ConfigManager() {
	let base = {
		init,
		getData
	}
	this.init = init
	this.getData = getData
		/** base **/
	function init(props) {
		service_loadConfig()
	}

	function getData() {
		return {}
	}
	/** service **/
	function service_loadConfig() {

	}
}

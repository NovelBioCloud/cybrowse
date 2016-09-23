import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function _Template2() {
	let _this = this,
		props, $container, $view

	this.init = function (props) {
		init(props)
	}
	this.getView = function () {
		return getView()
	}

	/** base **/
	function init(props) {
		data_init(props)
		view_init()
		event_init()
	}

	function getView() {
		return $view
	}
	/** service **/
	function data_init(_props) {
		props = _props
		$container = props.container
	}

	function view_init() {
		$view = $(view_getTemplate())
		$view.appendTo($container)
	}

	function view_getTemplate() {
		return `<div>template</div>`
	}

	function event_init() {

	}

}

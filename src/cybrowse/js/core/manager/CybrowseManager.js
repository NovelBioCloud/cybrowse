import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'
import toastr from 'toastr'
import CybrowseModel from '../model/CybrowseModel'

export default function CybrowseManager() {
	let cytoscapeManager, configManager

	this.init = init
		/**base*/
	function init(props) {
		cytoscapeManager = props.cytoscapeManager
		configManager = props.configManager
	}



}

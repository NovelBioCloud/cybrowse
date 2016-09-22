import $ from 'jquery'
import _ from 'lodash'
import {} from './common/plugins.js'
import immutable from 'immutable'

import App from './core/App'
$(() => {
	let app = new App()
	app.init({
		container: document.querySelector("#app")
	})
})

import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'

import App from './core/App'
import Registry from './platform/instantiation/Registry'

$(() => {
	let app = new App()
	app.init({
		container: $(document.querySelector("#app"))
	})
})

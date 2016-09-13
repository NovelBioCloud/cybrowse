import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom'
import $ from 'jquery'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
	App
} from './core'
injectTapEventPlugin()
$(() => {
	new App(document.querySelector("#app"))
})

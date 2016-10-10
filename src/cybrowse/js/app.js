import $ from 'jquery'
import {} from './lib/bootstrap'
import start from './workbench/main'
$(() => {
	start(document.querySelector("#app"))
})

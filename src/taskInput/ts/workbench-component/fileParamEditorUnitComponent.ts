import * as _ from 'lodash'
import { $ } from '../common'

interface Options {
	container: JQuery
}
export class FileParamEditorUnitComponent {
	private container: JQuery
	private element: JQuery

	constructor() {
	}

	private template = `
		<div class='fn-fileParamEditorUnitComponent class-fileParamEditorUnitComponent'>
			task file
		</div>
	`
	init(options: Options) {
		this.container = options.container
		this.element = $(this.template).appendTo(this.container)
	}

}
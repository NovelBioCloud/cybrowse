import * as _ from 'lodash'
import { $ } from '../common'

interface Options {
  container: JQuery
}
export class FileParamEditorComponent {
  private container: JQuery
  private element: JQuery
  constructor() {
  }

  private template = `
    <div class='fn-fileParamEditorComponent class-fileParamEditorComponent'>
      fileParamEditorComponent
    </div>
  `
  init(options: Options) {
    this.container = options.container
    this.element = $(this.template).appendTo(this.container)
  }
  getPanel() {
    return this.element
  }
}
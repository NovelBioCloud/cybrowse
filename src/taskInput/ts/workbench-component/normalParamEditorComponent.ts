import * as _ from 'lodash'
import { $ } from '../common'

interface Options {
  container: JQuery
}
export class NormalParamEditorComponent {
  private container: JQuery
  private element: JQuery

  constructor() {
  }

  private template = `
    <div class='fn-normalParamEditorComponent class-normalParamEditorComponent'>
      normalParamEditorComponent
    </div>
  `
  init(options: Options) {
    this.container = options.container
    this.element = $(this.template).appendTo(this.container)
  }

  getPanel(){
    return this.element
  }
}
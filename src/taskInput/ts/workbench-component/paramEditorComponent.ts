import * as _ from 'lodash'
import { $ } from '../common'

interface Options {
  container: JQuery
}
export class ParamEditorComponent {
  private container: JQuery
  private element: JQuery
  private fileParamEditorContainer: JQuery
  private normalParamEditorContainer: JQuery
  private fileParamTitle: JQuery
  private normalParamTitle: JQuery
  constructor() {
  }
  getFileParamEditorContainer(): JQuery {
    return this.fileParamEditorContainer
  }
  getNormalParamEditorContainer(): JQuery {
    return this.normalParamEditorContainer
  }
  private template = `
    <div class='fn-paramEditorComponent class-paramEditorComponent'>
      <div class='view-paramEditorComponent-title'>
        <div class='fn-fileParamTitle'>文件输入</div>
        <div class='fn-normalParamTitle'>参数输入</div>
      </div>
      <div class='view-paramEditorComponent-content'>
        <div class='fn-fileParamEditorContainer view-fileParamEditorContainer'></div>
        <div class='fn-normalParamEditorContainer view-normalParamEditorContainer'></div>
      </div>
    </div>
  `
  init(options: Options) {
    this.container = options.container
    this.element = $(this.template).appendTo(this.container)
    this.fileParamEditorContainer = this.element.find('.fn-fileParamEditorContainer')
    this.normalParamEditorContainer = this.element.find('.fn-normalParamEditorContainer')
    this.fileParamTitle = this.element.find('.fn-fileParamTitle')
    this.normalParamTitle = this.element.find('.fn-normalParamTitle')
    this.fileParamTitle.click(() => {
      this.showView(1)
    })
    this.normalParamTitle.click(() => {
      this.showView(2)
    })
    this.showView(1)
  }
  showView(state: number) {
    if (state === 1) {
      this.showFileParam(true)
      this.showNormalParam(false)
    } else {
      this.showFileParam(false)
      this.showNormalParam(true)
    }
  }
  private showFileParam(flag) {
    if (flag) {
      this.fileParamTitle.addClass('active')
      this.fileParamEditorContainer.removeClass('hidden')
    } else {
      this.fileParamTitle.removeClass('active')
      this.fileParamEditorContainer.addClass('hidden')
    }
  }
  private showNormalParam(flag) {
    if (flag) {
      this.normalParamTitle.addClass('active')
      this.normalParamEditorContainer.removeClass('hidden')
    } else {
      this.normalParamTitle.removeClass('active')
      this.normalParamEditorContainer.addClass('hidden')
    }
  }

}
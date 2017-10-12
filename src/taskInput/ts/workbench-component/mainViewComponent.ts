import * as $ from 'jquery'
interface Options {
  container: JQuery
}
export class MainViewComponent {
  private container: JQuery
  private element: JQuery
  private taskSelectorContainer: JQuery
  private paramEditorContainer: JQuery
  private template = `
    <div class='fn-mainViewComponent class-mainViewComponent'>
      <div class='fn-paramEditorContainer view-paramEditorContainer'></div>
      <div class='fn-taskSelectorContainer view-taskSelectorContainer'></div>
    </div>
  `
  init(options: Options) {
    this.container = options.container
    this.element = $(this.template).appendTo(this.container)
    this.taskSelectorContainer = this.element.find('.fn-taskSelectorContainer')
    this.paramEditorContainer = this.element.find('.fn-paramEditorContainer')
  }
  getTaskSelectorContainer() {
    return this.taskSelectorContainer
  }
  getParamEditorContainer() {
    return this.paramEditorContainer
  }
}
import { ParamEditorComponent } from '../workbench-component';
import { Context } from '../base/context'
import { FileParamEditor } from './fileParamEditor'
import { NormalParamEditor } from './normalParamEditor'
interface Options {
  container: JQuery,
  stageId: string,
  onSelect: (task: any) => void
}
export class ParamEditor {
  private context: Context
  private container: JQuery
  private onSelect: (task: any) => void
  private paramEditorComponent: ParamEditorComponent
  private fileParamEditor: FileParamEditor
  private normalParamEditor: NormalParamEditor
  inject(context: Context) {
    this.context = context.createChildContext()
  }
  init(options: Options) {
    this.container = options.container
    this.paramEditorComponent = new ParamEditorComponent()
    this.paramEditorComponent.init({
      container: this.container
    })
    this.fileParamEditor = this.context.initialBean(FileParamEditor)
    this.normalParamEditor = this.context.initialBean(NormalParamEditor)
    this.onSelect = options.onSelect
    this.fileParamEditor.init({
      stageId: options.stageId,
      container: this.paramEditorComponent.getFileParamEditorContainer()
    })
    this.normalParamEditor.init({
      stageId: options.stageId,
      container: this.paramEditorComponent.getNormalParamEditorContainer(),
      onSelect: (task) => {
        options.onSelect(task)
      }
    })
    this.paramEditorComponent.showView(2)
  }
  notifySelectTask(task: any) {
    this.fileParamEditor.notifySelectTask(task)
    this.normalParamEditor.notifySelectTask(task)
  }
  setTasks(tasks: any[]) {
    this.fileParamEditor.setTasks(tasks)
    this.normalParamEditor.setTasks(tasks)
  }
}
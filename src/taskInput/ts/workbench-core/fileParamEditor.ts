import { Context } from '../base'
import { FileParamEditorComponent } from '../workbench-component'
import { FileParamEditorUnit } from './fileParamEditorUnit'
import { $ } from '../common'
interface Options {
  container: JQuery,
  stageId: string
}
export class FileParamEditor {
  private context: Context
  private container: JQuery
  private fileParamEditorComponent: FileParamEditorComponent
  private fileParamEditorUnits: FileParamEditorUnit[]
  inject(context: Context) {
    this.context = context.createChildContext()
  }
  init(options: Options) {
    this.container = options.container
    this.fileParamEditorComponent = new FileParamEditorComponent()
    this.fileParamEditorComponent.init({
      container: this.container
    })
  }
  notifySelectTask(task: any) {
    this.fileParamEditorUnits.forEach((unit) => {
      if (unit.getTask().taskId === task.id) {
        unit.triggerSelect()
      }
    })
  }
  setTasks(tasks: any[]) {
    this.fileParamEditorComponent.getPanel().empty()
    this.fileParamEditorUnits = []
    tasks.forEach((task) => {
      const container = $('<div/>').appendTo(this.fileParamEditorComponent.getPanel())
      const normalParamEditorUnit = new FileParamEditorUnit();
      const listener = () => {
        console.log('select task:', task)
      }
      normalParamEditorUnit.init({
        container: container,
        task: task,
        onSelected: listener
      })
      this.fileParamEditorUnits.push(normalParamEditorUnit)
    })
  }
}
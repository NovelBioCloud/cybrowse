import { Context } from '../base'
import { FileParamEditorUnitComponent } from '../workbench-component'
import { TaskService } from '../platform-service'
interface Options {
  container: JQuery,
  task: any,
  onSelected: () => void
}
export class FileParamEditorUnit {
  private context: Context
  private container: JQuery
  private task: any
  private taskService: TaskService
  private options: Options
  private fileParamEditorUnitComponent: FileParamEditorUnitComponent
  inject(context: Context) {
    this.context = context.createChildContext()
    this.taskService = this.context.getBean(TaskService)
  }
  init(options: Options) {
    this.options = options
    this.container = options.container
    this.task = options.task
    this.fileParamEditorUnitComponent = new FileParamEditorUnitComponent()
    this.fileParamEditorUnitComponent.init({
      container: this.container
    })
  }
  triggerSelect() {
    this.options.onSelected && this.options.onSelected()
  }
  getTask() {
    return this.task
  }
}
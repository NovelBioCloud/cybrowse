import { Context } from '../base'
import { NormalParamEditorUnitComponent } from '../workbench-component'
import { TaskService } from '../platform-service'
interface Options {
  container: JQuery,
  task: any,
  onSelect: () => void,
}
export class NormalParamEditorUnit {
  private context: Context
  private container: JQuery
  private task: any
  private taskService: TaskService
  private options: Options
  private normalParamEditorUnitComponent: NormalParamEditorUnitComponent
  inject(context: Context) {
    this.context = context.createChildContext()
    this.taskService = this.context.getBean(TaskService)
  }
  init(options: Options) {
    this.options = options
    this.container = options.container
    this.task = options.task
    this.normalParamEditorUnitComponent = new NormalParamEditorUnitComponent()
    this.normalParamEditorUnitComponent.init({
      container: this.container,
      onSave: () => {
        return Promise.resolve(true)
      },
      onSelect: () => {
        options.onSelect()
      },
      task: options.task
    })
    this.taskService.queryParamEditPage(this.task.taskId, true).then((data) => {
      this.normalParamEditorUnitComponent.loadContent(data, true)
    })
  }
  triggerActive(flag = true) {
    this.normalParamEditorUnitComponent.active(flag)
  }
  getTask() {
    return this.task
  }
  getPosition() {
    return this.container.position()
  }
}
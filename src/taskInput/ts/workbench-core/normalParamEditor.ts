import { Context } from '../base'
import { NormalParamEditorUnit } from './normalParamEditorUnit'
import { NormalParamEditorComponent } from '../workbench-component'
import { TaskService } from '../platform-service'
import { $ } from '../common'
interface Options {
  container: JQuery,
  stageId: string,
  onSelect: (task: any) => void
}
export class NormalParamEditor {
  private context: Context
  private container: JQuery
  private stageId: string
  private onSelect: (task) => void
  private taskService: TaskService
  private onScroll: (top: number) => void
  private normalParamEditorComponent: NormalParamEditorComponent
  private normalParamEditorUnits: NormalParamEditorUnit[] = []
  inject(context: Context) {
    this.context = context.createChildContext()
    this.taskService = this.context.getBean(TaskService)
  }
  init(options: Options) {
    this.container = options.container
    this.stageId = options.stageId
    this.normalParamEditorComponent = new NormalParamEditorComponent()
    this.normalParamEditorComponent.init({
      container: this.container
    })
    this.onSelect = options.onSelect
  }
  notifySelectTask(task: any) {
    this.normalParamEditorUnits.forEach((unit) => {
      if (unit.getTask().taskId === task.taskId) {
        unit.triggerActive(true)
        this.scrollTo(unit.getPosition().top)
      } else {
        unit.triggerActive(false)
      }
    })
  }
  notifyActiveTask(task: any) {
    this.normalParamEditorUnits.forEach((unit) => {
      unit.triggerActive(unit.getTask().taskId === task.taskId)
    })
    this.onSelect(task)
  }
  setTasks(tasks: any[]) {
    this.normalParamEditorComponent.getPanel().empty()
    this.normalParamEditorUnits = []
    tasks.forEach((task) => {
      const wrap = this.normalParamEditorComponent.getPanel()
      const container = $('<div/>').appendTo(this.normalParamEditorComponent.getPanel())
      const normalParamEditorUnit = this.context.createInstance(NormalParamEditorUnit);
      const onSelect = () => {
        this.notifyActiveTask(task)
      }
      normalParamEditorUnit.init({
        container: container,
        task: task,
        onSelect: onSelect,
      })
      this.normalParamEditorUnits.push(normalParamEditorUnit)
    })
  }
  scrollTo(top: number) {
    this.container.animate({
      scrollTop: top
    })
  }
}
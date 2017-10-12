import { Context } from '../base'
import { TaskSelectorComponent } from '../workbench-component'

interface TaskSelectorOptions {
  container: JQuery,
  onInited: () => void,
  onSelect: (task?: any) => void
}

/**
 * 基础的任务选择框
 * 
 * @export
 * @class TaskSelector
 */
export class TaskSelector {
  protected taskSelectorComponent: TaskSelectorComponent
  protected context: Context
  protected options: TaskSelectorOptions
  inject(context: Context) {
    this.context = context.createChildContext()
  }
  init(options: TaskSelectorOptions) {
    this.options = options
    this.taskSelectorComponent = new TaskSelectorComponent()
    this.taskSelectorComponent.init({
      container: options.container
    })
    this.taskSelectorComponent.onSelect((task: any) => {
      options.onSelect(task)
    })
    this.taskSelectorComponent.onInited.then(() => {
      options.onInited()
    })
  }
  setData(data: Object[]) {
    this.taskSelectorComponent.setData(data)
  }
  notifySelectTask(task: any){
    this.taskSelectorComponent.notifySelectTask(task)
  }
}

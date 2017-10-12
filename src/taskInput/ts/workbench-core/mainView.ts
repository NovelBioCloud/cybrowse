import { Context } from '../base'
import { TaskSelector } from '.'
import { ParamEditor } from '.'
import { MainViewComponent } from '../workbench-component'
import { UserService, AppEntityService } from '../platform-service'
import { AppEntity } from '../platform-entity'
namespace MainView {

    export interface Options {
        container: JQuery
        stageId: string
    }
}
export class MainView {
    private taskSelector: TaskSelector
    private paramEditor: ParamEditor
    private context: Context
    private container: JQuery
    private mainViewComponent: MainViewComponent
    private userService: UserService
    private appEntityService: AppEntityService
    private appEntity: AppEntity
    constructor() {

    }
    inject(context: Context) {
        this.context = context
        this.appEntityService = this.context.getBean(AppEntityService)
    }

    init(options: MainView.Options) {

        this.userService = this.context.getBean(UserService)
        this.taskSelector = this.context.getBean(TaskSelector)
        this.paramEditor = this.context.getBean(ParamEditor)
        this.mainViewComponent = new MainViewComponent()
        this.mainViewComponent.init({
            container: options.container
        })
        this.taskSelector.init({
            container: this.mainViewComponent.getTaskSelectorContainer(),
            onSelect: (task) => {
                this.paramEditor.notifySelectTask({ taskId: task.id })
            },
            onInited: () => {
            }
        })
        this.paramEditor.init({
            stageId: options.stageId,
            container: this.mainViewComponent.getParamEditorContainer(),
            onSelect: (task) => {
                this.taskSelector.notifySelectTask({ id: task.taskId })
            }
        })
        this.appEntityService.query(options.stageId).then((appEntity) => {
            this.appEntity = appEntity
            this.taskSelector.setData(this.appEntity.cytoData.getData())
            this.paramEditor.setTasks(this.appEntity.tasks)
        })
    }


}

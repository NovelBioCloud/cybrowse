import { Context } from '../base'
import { ResultJson } from '../common'
import { TaskAction } from '../platform-action'
import { UserService } from '.'
import * as _ from 'lodash'
export class TaskService {
    private context: Context
    private userService: UserService
    private taskAction: TaskAction
    inject(context: Context) {
        this.context = context
        this.userService = this.context.getBean(UserService)
        this.taskAction = this.context.getBean(TaskAction)
    }
    query(stageId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.userService.isLogin) {
                this.taskAction.getTasksByStageId(stageId).then((data) => {
                    resolve(data)
                }, reject)
            } else {
                reject()
            }
        })
    }
    queryParamEditPage(taskId: string, readonly: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.userService.isLogin) {
                this.taskAction.queryParamEditPage(taskId, readonly).then((data) => {
                    resolve(data)
                }, reject)
            } else {
                reject()
            }
        })
    }

}
import { Context } from '../base'
import { ResultJson } from '../common'
import { TaskAction } from '../platform-action'
import { UserService } from '.'
import { CytoData, AppEntity } from '../platform-entity'
import * as _ from 'lodash'
export class AppEntityService {
    private context: Context
    private userService: UserService
    private taskAction: TaskAction
    inject(context: Context) {
        this.context = context
        this.userService = this.context.getBean(UserService)
        this.taskAction = this.context.getBean(TaskAction)
    }
    query(stageId: string): Promise<AppEntity> {
        return new Promise((resolve, reject) => {
            if (!this.userService.isLogin) {
                reject()
            }
            this.taskAction.getTasksByStageId(stageId).then((data) => {
                if (data.state) {
                    resolve(new AppEntity(stageId, data.result))
                } else {
                    reject()
                }
            }, reject)
        })
    }

}
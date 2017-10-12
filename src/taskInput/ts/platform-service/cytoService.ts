import { Context } from '../base'
import { ResultJson } from '../common'
import { TaskAction } from '../platform-action'
import { UserService } from '.'
import { CytoData } from '../platform-entity'
import * as _ from 'lodash'
export class CytoService {
    private context: Context
    private userService: UserService
    private taskAction: TaskAction
    inject(context: Context) {
        this.context = context
        this.userService = this.context.getBean(UserService)
        this.taskAction = this.context.getBean(TaskAction)
    }
    query(stageId: string): Promise<CytoData> {
        return new Promise((resolve, reject) => {
            if (this.userService.isLogin) {
                this.taskAction.getTasksByStageId(stageId).then((data) => {
                    resolve(new CytoData(data.result || []))
                }, reject)
            } else {
                reject()
            }
        })
    }


}
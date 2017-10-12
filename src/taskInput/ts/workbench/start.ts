
import { Context } from '../base'
import { shellContext, UserService } from '../platform'
import { MainView } from '../workbench-core'
import * as $ from 'jquery'
import * as queryString from 'query-string'
export function start() {

  const serviceContext: Context = shellContext.createChildContext()
  const userService: UserService = serviceContext.getBean(UserService)
  const rejectCallback = () => {
    console.log('请重新登陆')
  }
  /** 开发 */
  userService.login('fanxiaolong', 'fanxiaolong123').then(() => {
    if (userService.isLogin()) {
      const appContext: Context = serviceContext.createChildContext()
      const app: MainView = appContext.getBean(MainView)
      const container = $(`<div class='class-app'/>`).appendTo(document.body)
      const search = queryString.parse(location.search)
      app.init({
        container: container,
        stageId: <string>(search['stageId'] || '580d7f9f45ce03b082281b4d')
      })
    } else {
      rejectCallback()
    }
  }, rejectCallback)
}
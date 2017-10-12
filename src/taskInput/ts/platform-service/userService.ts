import { Context } from '../base'
import { UserInfo } from '../platform-entity'
import { ResultJson } from '../common'
import { UserAction } from '../platform-action'
export class UserService {
  private context: Context
  private userAction: UserAction
  private userInfo: UserInfo = new UserInfo()
  inject(context: Context) {
    this.context = context
    this.userAction = this.context.getBean(UserAction)
  }
  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userAction.login(username, password).then((data: ResultJson) => {
        this.userInfo.loginState = data.state
        resolve(this.userInfo.loginState)
      }, reject)
    })
  }
  updateLoginState(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userAction.isLogin().then((data: ResultJson) => {
        this.userInfo.loginState = data.state
        resolve(this.userInfo.loginState)
      }, reject)
    })
  }
  isLogin(): boolean {
    return this.userInfo.loginState
  }
  checkLogin() {
    if (!this.userInfo.loginState) {
      throw new Error('未登陆')
    }
  }
  logout(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.userAction.logout().then((data: ResultJson) => {
        this.userInfo.loginState = data.state
        resolve(!this.userInfo.loginState)
      }, reject)
    })
  }


}
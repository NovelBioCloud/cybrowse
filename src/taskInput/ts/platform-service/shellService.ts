import { Context } from '../base'
import { UserService } from '.'
import { ResultJson } from '../common'

export class ShellService {
  private context: Context
  private userService: UserService
  inject(context: Context) {
    this.context = context
  }

}
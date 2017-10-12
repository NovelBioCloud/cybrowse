import { $, config } from '../common'

import * as crypto from 'crypto'

export class UserAction {
  isLogin() {
    return $.ajax({
      type: 'post',
      url: `${config.path}/isLogin`
    })
  }
  login(username: string, password: string) {
    const password4trans = crypto.createHash('md5').update(password).digest('hex')
    return $.post(`${config.path}/login`,
      {
        username: username,
        password: password4trans
      }
    )
  }
  logout() {
    return $.ajax({
      type: 'post',
      url: `${config.path}/logout`
    })
  }
}
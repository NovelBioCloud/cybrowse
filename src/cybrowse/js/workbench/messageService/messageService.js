import toastr from 'toastr'
/**信息提示服务 */
export default class MessageService {
  constructor() {
    throw new Error('use method MessageService.instance() to get the instance')
  }
}
MessageService.instance = () => {
  return toastr
}
import toastr from 'toastr'
/** 
 * 信息提示服务
 * 前台页面信息提示框，使用 toastr 实现 
 */
export default class MessageControl {
  constructor() {
    throw new Error('use method MessageControl.instance() to get the instance')
  }
}
MessageControl.instance = () => {
  return toastr
}
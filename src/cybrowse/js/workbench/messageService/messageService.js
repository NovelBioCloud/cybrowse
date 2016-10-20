import toastr from 'toastr'
export default class MessageService {
  constructor(){
    throw new Error('use method MessageService.instance() to get the instance')
  }
}
MessageService.instance = () => {
  return toastr
}
import ApplicationContext from './ApplicationContext'

export default function RegistryType() {
  let context = new ApplicationContext()
  this.add = add
  this.get = get
  function add(type, cb) {
    context.addType(type, true)
    cb && cb(context.getBean(type))
  }

  function get(type) {
    context.getBean(type)
  }
}
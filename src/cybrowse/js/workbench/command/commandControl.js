/**
 * 命令服务，全局服务
 * 通过 registerCommand 注册服务，通过 runCommand 可以全局调用服务，
 * 相同id的服务会被覆盖
 */
export default class CommandControl {
  constructor() {
    this._command = new Map()
  }
  init(props, context) {
    this.props = props
    this.context = context
  }

  /**注册命令 */
  registerCommand(id, command) {
    this._command.set(id, command)
  }
  /**执行命令 */
  runCommand(id, ...args) {
    return new Promise((c, e) => {
      let command = this._command.get(id)
      if (!command) {
        console.log(`command ${id} does not exist`)
        e()
      } else {
        let result = null
        try {
          let runArgs = []
          if (command.args) {
            runArgs = runArgs.concat(command.args || [])
          }
          if (args) {
            runArgs = runArgs.concat(args)
          }
          result = command.handle.apply(null, runArgs)
        } catch (err) {
          e(err)
        }
        c(result)
      }
    })
  }
}
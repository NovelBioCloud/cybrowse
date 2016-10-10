export default class CommandService {
  constructor() {
    this._command = new Map()
  }
  init(props, {
    services
  }) {

  }
  registerCommand(id, command) {
    this._command.set(id, command)
  }
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
function CommandService() {
  let init = function(){

  }
  let commands = new Map()
  let getCommand = function(id){
    return commands.get(id)
  }
  let runCommand = function(id,runContext){
    getCommand().run(runContext)
  }
  this.getCommand = getCommand
  this.runCommand = runCommand
}
function ActionService() {
  let init = function(){

  }
  let createAction = function (callback){
    return callback && callback()
  }
  this.createAction = createAction
}
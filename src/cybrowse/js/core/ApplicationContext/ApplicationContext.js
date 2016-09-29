export default class ApplicationContext {

  constructor(props, parentApplicationContext) {
    this._parase(props)
    this.parentApplicationContext = parentApplicationContext
  }

  publishEvent(event) {

  }
}
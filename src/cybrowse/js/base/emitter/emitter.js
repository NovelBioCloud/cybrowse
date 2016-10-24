import $ from 'jquery'

/**事件工具类 */
export default class Emitter {

  constructor(options = '') {
    this._callbacks = $.Callbacks(options)
  }
  /**获取事件，通过获取的事件可以注册回调方法，并且返回注销事件方法 */
  get event() {
    return (listener, disposable) => {
      this._callbacks.add(listener)
      return {
        dispose: () => {
          this._callbacks.remove(listener)
          $.isFunction(disposable) && disposable()
        },
        remove: () => {
          this._callbacks.remove(listener)
        }
      }
    }
  }
  /**发布事件 */
  emit(data) {
    this._callbacks.fire(data)
  }
}
/**只发布一次的事件，事件可以在事件发布前和发布后进行监听 */
export class FireOnceEmitter {
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  get event() {
    return (listener, disposable) => {
      this._promise.then((data) => {
        listener && listener(data)
      })
      return {
        dispose: () => {
          disposable && disposable()
        }
      }
    }
  }
  emit(data) {
    this._resolve(data)
  }
}
/**延迟发布事件,包装一个Emitter对象 */
export class DelayEmitter {
  /**传入被包装的Emitter对象和延迟的时间 */
  constructor(emitter, time = 0) {
    this._emitter = emitter
    this._time = time
  }
  get event() {
    return this._emitter.event
  }
  emit(data) {
    setTimeout(() => {
      this._emitter.emit(data)
    }, this._time)
  }
}
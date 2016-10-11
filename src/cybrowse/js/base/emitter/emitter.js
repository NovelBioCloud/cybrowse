import $ from 'jquery'

export default class Emitter {

  constructor(options = '') {
    this._callbacks = $.Callbacks(options)
  }
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
  emit(data) {
    this._callbacks.fire(data)
  }
}
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
export class DelayEmitter {
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
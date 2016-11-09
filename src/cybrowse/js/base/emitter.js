import $ from 'jquery'

/**
 * 事件工具类
 * @see currentDataService.js
 * @see baseStyleService.js
 * @see currentStyleService.js
 * 
 * 例:
 * const emitter = new Emitter()
 * //注册监听事件
 * const disposable = emitter.event((data)=>{
 *  console.log(data)//打印123
 * })
 * //发布事件
 * emitter.emit(123)//发布数据
 * //销毁监听事件
 * disposable.dispose（)
 */
export default class Emitter {

  /**
   * 构造函数
   * @param options 参考$.Callbacks的options
   */
  constructor(options = '') {
    this._callbacks = $.Callbacks(options)
  }
  /**
   * 获取事件，通过获取的事件可以注册回调方法，并且返回注销事件方法
   * 
   * @return disposable 调用对象的dispose方法可以销毁已注册的监听事件
   */
  get event() {
    return (listener) => {
      this._callbacks.add(listener)
      return {
        dispose: () => {
          this._callbacks.remove(listener)
        }
      }
    }
  }
  /**
   * 发布事件
   */
  emit(data) {
    this._callbacks.fire(data)
  }
}
/**
 * 只发布一次的事件，事件可以在事件发布前和发布后进行监听
 */
export class FireOnceEmitter {

  /**
   * 构造方法
   */
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  /**
   * 事件
   * @return Function:(listener,dispose)=>disposable
   */
  get event() {
    return (listener, dispose) => {
      this._promise.then((data) => {
        listener && listener(data)
      })
      return {
        dispose: () => {
          dispose && dispose()
        }
      }
    }
  }
  /**
   * 发布时间
   * @param data 发布的数据
   */
  emit(data) {
    this._resolve(data)
  }
}
/**
 * 延迟发布事件,包装一个Emitter对象
 */
export class DelayEmitter {
  /**
   * 传入被包装的Emitter对象和延迟的时间
   * @param emitter 事件发射器
   * @param time 延迟时间
   */
  constructor(emitter, time = 0) {
    this._emitter = emitter
    this._time = time
  }
  /**
   * 事件
   * @return Function:(listener,dispose)=>disposable
   */
  get event() {
    return this._emitter.event
  }
  /**
   * 发布时间
   * @param data 发布的数据
   */
  emit(data) {
    setTimeout(() => {
      this._emitter.emit(data)
    }, this._time)
  }
}

export function createListenerRegister(emitter, type) {
  return (callback) => {
    emitter.on(type, callback)
    return {
      dispose: () => {
        emitter.off(type, callback)
      }
    }
  }
}
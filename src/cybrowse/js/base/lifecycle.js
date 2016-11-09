import _ from 'lodash'

/**
 * 销毁对象的工具方法 
 * 
 * @param disposable 一个有dispose方法的对象
 */
export function dispose(disposable) {
  if (_.isArray(disposable)) {
    disposable.forEach((item) => {
      dispose(item)
    })
  } else {
    disposable && disposable.dispose && disposable.dispose()
  }
}

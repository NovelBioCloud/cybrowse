import _ from 'lodash'

/**析构对象的工具方法 */
function dispose(disposable) {
  if (_.isArray(disposable)) {
    disposable.forEach((item) => {
      dispose(item)
    })
  } else {
    disposable && disposable.dispose && disposable.dispose()
  }
}
export default {
  dispose
} 
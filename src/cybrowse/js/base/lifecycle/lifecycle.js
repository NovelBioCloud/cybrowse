

export default function dispose(disposable) {
  if (_.isArray(disposable)) {
    disposable.forEach((item) => {
      dispose(item)
    })
  } else {
    disposable && disposable.dispose && disposable.dispose()
  }
}
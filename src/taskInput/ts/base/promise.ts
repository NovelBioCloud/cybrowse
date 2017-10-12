
export class PPromise<T> extends Promise<T>{
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (value?: T | PromiseLike<T>) => void
  constructor(callback?:
    (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (value?: T | PromiseLike<T>) => void
    ) => void) {
    super((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      callback && callback(this.resolve, this.reject)
    })
  }
}
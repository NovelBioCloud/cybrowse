/**
 * 数据存储服务，使用页面的 localStorage 对象实现
 */
export default class StorageControl {
  constructor() {
    throw new Error('please use StorageControl.instance() method')
  }
}

StorageControl.instance = () => {
  return localStorage
}
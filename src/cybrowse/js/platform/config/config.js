import {createListenerRegister} from '../../base/emitter'
import StorageService from '../../workbench/storage/storageService'

/**
 * 数据存储对象
 */
const localStorage = StorageService.instance()

/**
 * 配置文件服务
 */
class ConfigStorageService {
  constructor(configName) {
    if(!configName || configName === '') {
      throw new Error('configName can not be null')
    }
    this.configName = configName
  }
  /**
   * 保存数据
   */
  save(data) {
    localStorage.setItem(this.configName, JSON.stringify(data))
  }
  /**
   * 加载数据
   */
  load() {
    try {
      return JSON.parse(localStorage.getItem(this.configName))
    } catch (e) {
      return null
    }
  }
}

/**
 * 配置文件服务模型
 */
export default class ConfigModel {

  /**
   * @constructor 
   * @param configName 配置文件的唯一标识
   */
  constructor(configName) {
    const localStorageService = new ConfigStorageService(configName)
    this.localStorageService = localStorageService
    this.init()
    this.save()
  }
  init() {
    let data = this.localStorageService.load()
    if (!data) {
      data = {}
      this.localStorageService.save(this.data)
    }
    this.data = data
  }
  /**
   * 根据数据的path，获取数据
   * path支持类似结构：
   * a
   * a.b
   * a.b.c
   */
  getValue(path) {
    return _.get(this.data, path)
  }

  /**
   * 设置数据值
   */
  setValue(path, value) {
    return _.set(this.data, path, value)
  }
  /**
   * 销毁数据值
   */
  unsetValue(path) {
    _.unset(this.data, path)
  }
  /**
   * 保存为持久文件
   */
  save() {
    this.localStorageService.save(this.data)
  }
}

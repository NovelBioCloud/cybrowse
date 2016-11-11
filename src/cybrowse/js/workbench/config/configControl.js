
import ConfigModel from '../../platform/config/config'
import EventEmitter from 'events'

/** 创建运行实例的配置文件模型 */
const configModel = new ConfigModel('cybrowse')

/** 配置文件服务 */
export default class ConfigControl {
  constructor() {
    this._emitter = new EventEmitter()

  }
  get onSave() {
    return createListenerRegister(this.emitter, 'onSave')
  }
  get onLoad() {
    return createListenerRegister(this.emitter, 'onLoad')
  }
  get onUpdate() {
    return createListenerRegister(this.emitter, 'onUpdate')
  }
  load() {
    this.configModel = configModel
    this.onLoad.emit()
  }

  save() {
    configModel.save()
    this.onSave.emit()
  }
  getValue(key) {
    return this.configModel.getValue(key)
  }
  setValue(key, value) {
    this.configModel.setValue(key, value)
    return this.onUpdate.emit(key, value)
  }
  removeValue(key, value) {
    this.configModel.unsetValue(key)
    return this.onUpdate.emit(key)
  }

}
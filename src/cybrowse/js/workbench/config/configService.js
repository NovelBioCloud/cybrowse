
import ConfigModel from '../../platform/config/config'


const configModel = new ConfigModel('cybrowse')

export default class ConfigService {
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
    this
      .onLoad
      .emit()
  }

  save() {
    configModel.save()
    this
      .onSave
      .emit()
  }
  getValue(key) {
    return this
      .configModel
      .getValue(key)
  }
  setValue(key, value) {
    this
      .configModel
      .setValue(key, value)
    return this
      .onUpdate
      .emit(key, value)
  }
  removeValue(key, value) {
    this
      .configModel
      .unsetValue(key)
    return this
      .onUpdate
      .emit(key)
  }

}
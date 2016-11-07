import {EventEmitter} from 'events'
import {createListenerRegister} from '../base/emitter/emitter'
import StorageService from '../../workbench/storageService'

const localStorage = StorageService.instance()

class ConfigStorageService {
  constructor(configName) {
    if(!configName || configName === '') {
      throw new Error('configName can not be null')
    }
    this.configName = configName
  }
  save(data) {
    localStorage.setItem(this.configName, JSON.stringify(data))
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(this.configName))
    } catch (e) {
      return null
    }
  }
}


export default class ConfigModel {

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
  getValue(path) {
    return _.get(this.data, path)
  }

  setValue(path, value) {
    return _.set(this.data, path, value)
  }
  unsetValue(path) {
    _.unset(this.data, path)
  }
  save() {
    this.localStorageService.save(this.data)
  }
}

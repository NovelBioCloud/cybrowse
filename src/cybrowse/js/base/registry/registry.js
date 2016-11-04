import Lifecycle from '../lifecycle/lifecycle'
/**
 * 全局对象注册服务类服务
 * @see class: Registry
 */
class RegistryService extends Map {
  /**
   * 构造函数
   */
  constructor() {
    super()
    this._validate = false
  }
  /**
   * 创建或者获取 registry
   * @param name registry 的标识 name
   */
  asRegistry(name) {
    if (!this.has(name)) {
      const registry = this._newRegistry(name)
      this.set(name, registry)
    }
    return this.get(name)
  }
  /**
   * 创建 registry
   * @param name registry 的标识 name
   */
  _newRegistry(name) {
    this._validate = true
    const registry = new Registry(name)
    this._validate = false
    return registry
  }
  /**
   * 验证
   */
  validate() {
    return this._validate
  }
}
/**
 * 全局对象注册服务类实例
 * @see class: Registry
 */
const registryService = new RegistryService()
/**
 * 全局对象注册类实例
 * 全局对象注册后可以通过registry的实例获取
 */
class Registry extends Map {
  /**
   * 构造函数
   * @param name 注册类实例名
   */
  constructor(name) {
    super()
    if (!registryService.validate()) {
      throw new Error('use registry.as to create a new instance')
    }
    this.name = name
  }
  /**
   * 创建或获取一个注册类实例
   * @param name 实例
   */
  as(name) {
    return registryService.asRegistry(name)
  }
  /**
   * 注册对象
   * @param id 对象 id 标识
   * @param instance 对象
   */
  register(id, instance) {
    this.set(id, instance)
  }
  /**
   * 注销对象
   * @param id 对象 id 标识
   */
  unregister(id) {
    const instance = this.get(id)
    Lifecycle.dispose(instance)
    this.delete(id)
  }
}
/**
 * 全局注册类实例标识
 */
const GlobalRegistry = 'global'
/**
 * 全局对象注册类实例
 */
const registry = registryService.as(GlobalRegistry)
export default registry
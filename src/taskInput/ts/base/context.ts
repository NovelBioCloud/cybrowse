import * as _ from 'lodash'

interface Bean {
  inject?: (context: Context) => void
}

/**
 * 上下文对象，用来创建，实例化对象
 * 
 * @export
 * @class Context
 */
export class Context {

  /**
   * 上级上下文
   * 
   * @private
   * @type {Context[]}
   * @memberOf Context
   */
  private parentContexts: Context[] = []

  /**
   * 服务对象缓存对象
   * 
   * @private
   * @type {Map<any, any>}
   * @memberOf Context
   */
  private beans: Map<any, Bean> = new Map<any, Bean>()

  /**
   * Creates an instance of Context.
   * 
   * @param {string} [id]
   * @param {Context[]} [parentContexts=[]]
   * 
   * @memberOf Context
   */
  constructor(public id?: string, parentContexts: Context[] = []) {
    this.parentContexts.concat(parentContexts)
  }


  /**
   * 创建子上下文对象
   * 
   * @returns {Context}
   * 
   * @memberOf Context
   */
  createChildContext(id?: string): Context {
    if (!id) {
      id = 'context:' + _.uniqueId()
    }
    return new Context(id, [this])
  }

  /**
   * 查找指定类型的服务
   * 
   * @param {*} type
   * @returns
   * 
   * @memberOf Context
   */
  findBean<T extends Bean>(type: { new (): T }): T {
    let instance = <T>this.beans.get(type) || null
    if (!instance) {
      for (let parentInstance of this.parentContexts) {
        instance = parentInstance.findBean(type)
        if (instance) {
          break
        }
      }
    }
    return instance
  }
  /**
 * 查找指定类型的服务
 * 
 * @param {*} type
 * @returns
 * 
 * @memberOf Context
 */
  getBean<T extends Bean>(type: { new (): T }): T {
    if (!type) {
      throw new Error('type can not be null')
    }
    let Bean = this.findBean(type)
    if (!Bean) {
      Bean = this.initialBean(type)
    }
    if (!Bean) {
      throw new Error('Bean initial failed')
    }
    return Bean
  }


  /**
   * 初始化新的bean对象,已经添加的不会重复添加
   * 
   * @param {{ new (): Bean }[]} beanTypes
   * @returns {Bean[]}
   * 
   * @memberOf Context
   */
  initialBeans(beanTypes: { new (): Bean }[]): Bean[] {
    if (!beanTypes) {
      return []
    }
    beanTypes.filter((type) => {
      return !this.beans.has(type)
    }).map((type) => {
      const Bean = new type()
      this.beans.set(type, Bean)
      return Bean
    }).forEach((Bean) => {
      this.inject(Bean)
    })
    return beanTypes.map((type) => this.beans.get(type))
  }

  /**
   * 添加新的对象，保存在上下文中
   * 
   * @param {*} type
   * @param {*} Bean
   * 
   * @memberOf Context
   */
  initialBean<T extends Bean>(type: { new (): T }, Bean?: T): T {
    const beans = this.initialBeans([type])
    if (beans.length === 0) {
      return null
    } else {
      return <T>beans[0]
    }
  }

  /**
   * 添加新的对象
   * 
   * @template T
   * @param {{ new (): T }} type
   * @returns {T}
   * 
   * @memberOf Context
   */
  createInstance<T extends Bean>(type: { new (): T }): T {
    if (!type) {
      return null
    }
    const instance = new type()
    this.inject(instance)
    return instance
  }

  /**
   * 注入上下文
   * 
   * @private
   * @param {Bean} Bean
   * 
   * @memberOf Context
   */
  private inject(bean: Bean) {
    if (bean && bean.inject) {
      bean.inject(this)
    }
  }
}


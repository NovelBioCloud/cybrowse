import _ from 'lodash'

import BeanFactory from './BeanFactory'

export default class Context {
  constructor() {
    this.prototypeBeanFactory = new BeanFactory()
    this.singletonBeanFactory = new BeanFactory()
    this.singletonBeanInstanceStore = new Map()
    this.prototypeBeanInstanceStore = new Set()
    this.children = []
    this.parent = null
  }

  addType(type, isSingleton) {
    if (isSingleton) {
      this.singletonBeanFactory.addType(type)
    } else {
      this.prototypeBeanFactory.addType(type)
    }
  }

  getBeans() {
    return [...this.singletonBeanInstanceStore.values(), ...this.prototypeBeanInstanceStore.values]
  }

  removeBean(bean) {
    if (this.prototypeBeanInstanceStore.has(bean)) {
      this.prototypeBeanInstanceStore.delete(bean)
    } else {
      for ([key, value] of this.singletonBeanInstanceStore.entries()) {
        if (value == bean) {
          this.singletonBeanInstanceStore.remove(key)
          break
        }
      }
    }
  }

  getBean(type) {
    if (this.singletonBeanFactory.has(type)) {
      return this.findSingletonBean(type)
    } else if (this.prototypeBeanFactory.has(type)) {
      return this.getPrototypeBean(type)
    } else {
      return null
    }
  }
  add(type, bean) {
    this.addType(type, true)
    this.singletonBeanInstanceStore.set(type, bean)
  }
  find(type) {
    return this.findSingletonBean(type)
  }
  findSingletonBean(type) {
    if (this.singletonBeanInstanceStore.has(type)) {
      this.singletonBeanInstanceStore.get(type)
    } else {
      let instance = this.singletonBeanFactory.getBean(type)
      this.singletonBeanInstanceStore.set(type, instance)
    }
  }

  getPrototypeBean(type) {
    let instance = this.prototypeBeanFactory.getBean(type)
    this.prototypeBeanInstanceStore.add(instance)
    return instance
  }

  /**对象必须具有getBeans方法 */

  dispose() {
    this.getBeans().forEach((bean) => {
      bean.dispose && bean.dispose()
      this.remove(bean)
    })
  }

  /**添加上下级的功能 */


  appendChild(context) {
    context.setParent(this)
    this.children.push(context)
  }
  removeChild(context) {
    context.setParent(null)
    _.pull(this.children, context)
  }
  setParent(context) {
    this.parent = context
  }
  removeParent() {
    if (this.parent) {
      this.parent.removeChild(this)
    }
  }

  /**发布事件的功能 */
  publish(event) {
    this.getBeans().forEach((bean) => {
      bean.subscribe && bean.subscribe(event)
    })
    this.notifyChildren(event)
  }
  notifyChildren(event) {
    if (this.childContext) {
      this.childContext.forEach((context) => {
        context.publish(event)
      })
    }
  }
}
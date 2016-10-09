import _ from 'lodash'

import BeanFactory from './BeanFactory'

export default function ApplicationContext() {
  let prototypeBeanFactory = new BeanFactory()
  let singletonBeanFactory = new BeanFactory()
  let singletonBeanInstanceStore = new Map()
  let prototypeBeanInstanceStore = new Set()
  this.addType = addType
  this.getBean = getBean
  this.removeBean = removeBean
  this.getBeans = getBeans

  function addType(type, isSingleton) {
    if (isSingleton) {
      singletonBeanFactory.addType(type)
    } else {
      prototypeBeanFactory.addType(type)
    }
  }

  function getBeans() {
    return [...singletonBeanInstanceStore.values(), ...prototypeBeanInstanceStore.values]
  }

  function removeBean(bean) {
    if (prototypeBeanInstanceStore.has(bean)) {
      prototypeBeanInstanceStore.delete(bean)
    } else {
      for ([key, value] of singletonBeanInstanceStore.entries()) {
        if (value == bean) {
          singletonBeanInstanceStore.remove(key)
          break
        }
      }
    }
  }

  function getBean(type) {
    if (singletonBeanFactory.has(type)) {
      return getSingletonBean(type)
    } else if (prototypeBeanFactory.has(type)) {
      return getPrototypeBean(type)
    } else {
      return null
    }
  }

  function getSingletonBean(type) {
    if (singletonBeanInstanceStore.has(type)) {
      singletonBeanInstanceStore.get(type)
    } else {
      let instance = singletonBeanFactory.getBean(type)
      singletonBeanInstanceStore.set(type, instance)
    }
  }

  function getPrototypeBean(type) {
    let instance = prototypeBeanFactory.getBean(type)
    prototypeBeanInstanceStore.add(instance)
    return instance
  }

}

function disposible() {
  this.dispose = function () {
    this.getBeans().forEach((bean) => {
      bean.dispose && bean.dispose()
      this.remove(bean)
    })
  }
}

function hierarchical() {
  this.children = []
  this.parent = null
  this.appendChild = function (context) {
    context.setParent(this)
    this.children.push(context)
  }
  this.removeChild = function (context) {
    context.setParent(null)
    _.pull(this.children, context)
  }
  this.setParent = function (context) {
    this.parent = context
  }
  this.removeParent = function () {
    if (this.parent) {
      this.parent.removeChild(this)
    }
  }
}

function publishable() {
  this.publish = function (event) {
    this.getBeans().forEach((bean) => {
      bean.subscribe && bean.subscribe(event)
    })
    this.notifyChildren(event)
  }
  this.notifyChildren = function (event) {
    if (this.childContext) {
      this.childContext.forEach((context) => {
        context.publish(event)
      })
    }
  }
}

Object.assign(ApplicationContext, hierarchical, publishable, disposible)
import _ from 'lodash'

class Singletons {

  constructor() {
    this.beans = new Map()
    this.name = ''
  }

  setName(_name) {
    this.name = _name
    return this
  }

  add(key, bean) {
    if (this.beans.has(key)) {
      throw new Error(`has registried key: ${key}`)
    }
    this.beans.set(key, bean)
    return this
  }

  find(key) {
    if (_.isArray(key)) {
      return key.map((value) => {
        return this.beans.get(key)
      })
    } else {
      return this.beans.get(key)
    }
  }

  clone(_name) {
    let result = new Singletons(_name)
    for (let [key, value] of this.beans) {
      result.add(key, value)
    }
    return result
  }

}

export default Singletons
/**工厂类 */
export default function BeanFactory() {

  let typeStore = new Set()

  this.addType = addType
  this.getBean = getBean
  this.hasType = hasType

  function addType(type) {
    typeStore.add(type)
  }

  function getBean(type) {
    if (!typeStore.has(type)) {
      throw new Error('has not type: ${type}')
    }
    return Refact.construct(type)
  }

  function hasType(type) {
    return typeStore.has(type)
  }
}
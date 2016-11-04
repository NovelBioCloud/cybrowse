import _ from 'lodash'

/**
 * 匹配方式常量
 */
export const MappingTypeConstant = {
  passthrough: 'passthrough',
  discrete: 'discrete'
}
/**
 * Node样式名称
 */
export const NodeStyleName = {
  backgroundColor: 'background-color'
}
/**
 * Edge样式名称
 */
export const EdgeStyleName = {
  lineColor: 'line-color'
}
/**
 * 样式信息模型
 * @see NodeStyleModel EdgeStyleModel
 */
export class StyleDetail {
  /**
   * 构造函数
   * @param 样式数据
   */
  constructor(style) {
    this._style = style
    /**默认节点样式 */
    this._nodeDefaultValue = []
    /**默认边样式 */
    this._edgeDefaultValue = []
    /**直接属性值传值的节点样式 */
    this._nodePassthroughMapping = []
    /**直接属性值传值的边样式 */
    this._edgePassthroughMapping = []
    /**匹配属性值传值的节点样式 */
    this._nodeDiscreteMapping = []
    /**匹配属性值传值的边样式 */
    this._edgeDiscreteMapping = []
    /**直接设置的节点样式 */
    this._nodeBypass = []
    /**直接设置的边样式 */
    this._edgeBypass = []
    /** 自带样式，节点被选择后的样式*/
    this._nodeSelected = []
    /** 自带样式，边被选择后的样式*/
    this._edgeSelected = []

    this.resolve()
    this.setDefaultValue()
  }
  /**
   * 解析传入的样式文件
   */
  resolve() {
    this._style.style.forEach((item) => {
      if (item.selector === 'node') {
        if (this._nodeDefaultValue.length == 0) {
          this._nodeDefaultValue.push(item)
        } else {
          this._nodePassthroughMapping.push(item)
        }
      } else if (item.selector === 'edge') {
        if (this._edgeDefaultValue.length == 0) {
          this._edgeDefaultValue.push(item)
        } else {
          this._edgePassthroughMapping.push(item)
        }
      } else if (/node\[/.test(item.selector)) {
        if (/node\[ id/.test(item.selector)) {
          this._nodeBypass.push(item)
        } else {
          this._nodeDiscreteMapping.push(item)
        }
      } else if (/edge\[/.test(item.selector)) {
        if (/edge\[ id/.test(item.selector)) {
          this._edgeBypass.push(item)
        } else {
          this._edgeDiscreteMapping.push(item)
        }
      } else if (/node:selected/.test(item.selector)) {
        this._nodeSelected = [item]
      } else if (/edge:selected/.test(item.selector)) {
        this._edgeSelected = [item]
      }
    })
  }
  /**
   * 设置默认数据
   */
  setDefaultValue() {
    if (this._nodeDefaultValue.length === 0) {
      this._nodeDefaultValue.push({
        selector: 'node',
        style: {}
      })
    }
    if (this._edgeDefaultValue.length === 0) {
      this._edgeDefaultValue.push({
        selector: 'edge',
        style: {}
      })
    }
    if (this._nodePassthroughMapping.length === 0) {
      this._nodePassthroughMapping.push({
        selector: 'node',
        style: {}
      })
    }
    if (this._edgePassthroughMapping.length === 0) {
      this._edgePassthroughMapping.push({
        selector: 'edge',
        style: {}
      })
    }
    if (this._nodeSelected.length === 0) {
      this._nodeSelected.push({
        selector: 'node:selected',
        style: { "background-color": "#FFFF00" }
      })
    }
    if (this._edgeSelected.length === 0) {
      this._edgeSelected.push({
        selector: 'edge:selected',
        style: { "line-color": "#FFFF00" }
      })
    }
  }
  /**
   * 构造样式文件
   */
  build() {
    this._style.style = [
      ...this._nodeDefaultValue,
      ...this._nodePassthroughMapping,
      ...this._nodeDiscreteMapping,
      ...this._nodeBypass,
      ...this._nodeSelected,
      ...this._edgeDefaultValue,
      ...this._edgePassthroughMapping,
      ...this._edgeDiscreteMapping,
      ...this._edgeBypass,
      ...this._edgeSelected
    ]
  }
}

/**
 * 节点样式模型
 * @see lineColor.js background.js
 */
export class NodeStyleModel {
  /**
   * 构造方法
   * @param styleName 样式文件名
   * @param currentStyleService 当前样式服务
   */
  constructor(styleName, currentStyleService) {
    this._styleName = styleName
    this._currentStyleService = currentStyleService
  }
  /**
   * 获取默认数据
   * @return
   */
  getDefaultValue() {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    return styleDetail._nodeDefaultValue[0].style[this._styleName]
  }
  /**
   * 设置默热样式的数据
   * @param value
   */
  setDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._nodeDefaultValue[0].style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除默认样式
   */
  removeDefaultValue() {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    delete (styleDetail._nodeDefaultValue[0].style)[this._styleName]
    styleDetail.build()
  }
  /**
   * 获取直接传值的数据
   * @param id 节点的id值
   * @return 样式数据
   */
  getBypass(id) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `node[ id = '${id}' ]`,
        style: {}
      }
      styleDetail._nodeBypass.push(bypassStyle)
    }
    styleDetail.build()
    return bypassStyle.style[this._styleName] || null
  }
  /**
   * 设置直接传值的数据
   * @param id 节点的id值
   * @param value 节点的数据
   */
  setBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `node[ id = '${id}' ]`,
        style: {}
      }
      styleDetail._nodeBypass.push(bypassStyle)
    }
    bypassStyle.style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除直接传值的数据
   * @param id 节点的id值
   */
  removeBypass(id) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[ id = '${id}' ]`
    })
    if (bypassStyle) {
      delete bypassStyle.style[this._styleName]
    }
    styleDetail.build()
  }
  /**
   * 获取匹配传值的数据 
   * @param attrName 属性名
   * @param attrValue 属性值
   * @return 
   */
  getDiscreteMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `node[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._nodeDiscreteMapping.push(bypassStyle)
    }
    styleDetail.build()
    return mappingStyle.style[this._styleName]
  }
  /**
   * 设置匹配传值的数据
   * @param attrName 属性名
   * @param attrValue 属性值
   * @param 新值
   */
  setDiscreteMapping(attrName, attrValue, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._nodeDiscreteMapping, (item) => {
      return item.selector == `node[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `node[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._nodeDiscreteMapping.push(mappingStyle)
    }
    mappingStyle.style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除间接匹配传值的数据
   * @param attrName 属性名
   * @param attrValue 属性值
   */
  removeDiscreteMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._nodeDiscreteMapping, (item) => {
      return item.selector == `node[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (mappingStyle) {
      _.pull(styleDetail._nodeDiscreteMapping, mappingStyle)
    }
    styleDetail.build()
  }
  /**
   * 删除匹配传值的数据，删除全部 attrName 的值 
   * @param attrName 属性名
   */
  removeDiscreteMappings(attrName) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    _.remove(styleDetail._nodeDiscreteMapping, (item) => {
      return new RegExp(`node\\[${attrName} = '(.*)' \\]`).test(item.selector) && item.style[this._styleName]
    })
    styleDetail.build()
  }
  /** 
   * 设置直接匹配传值
   * @param attrName 属性名
   */
  setPassthroughMapping(attrName) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._nodePassthroughMapping[0].style[this._styleName] = `data(${attrName})`
    styleDetail.build()
  }
  /** 
   * 删除直接匹配传值
   * @param attrName 属性名
   */
  removePassthroughMapping() {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    if (styleDetail._nodePassthroughMapping[0].style[this._styleName]) {
      delete styleDetail._nodePassthroughMapping[0].style[this._styleName]
    }
    styleDetail.build()
  }
  /** 
   * 获取匹配数据的信息 
   * @return [匹配方式，匹配属性，匹配数据]
   */
  getMappingInfo() {
    const passthrough = MappingTypeConstant.passthrough
    const discrete = MappingTypeConstant.discrete
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let passthroughMapping = styleDetail._nodePassthroughMapping[0]
    let discreteMapping = styleDetail._nodeDiscreteMapping
    let mappingType = null
    let mappingAttrName = null
    let mappingDetail = []
    if (passthroughMapping.style[this._styleName]) {
      mappingType = passthrough
      const styleValue = passthroughMapping.style[this._styleName]
      mappingAttrName = new RegExp('data\\((\\w+?)\\)').exec(styleValue)[1]

    } else {
      discreteMapping.forEach(item => {
        if (item.style[this._styleName]) {
          let reg = /node\[(.*) = '(.*)' \]/gi;
          let [foo, attrName, attrValue] = reg.exec(item.selector)
          if (attrName && attrValue) {
            mappingAttrName = attrName
            mappingDetail.push([attrName, attrValue])
          }
        }
      })
      if (mappingDetail.length != 0) {
        mappingType = discrete
      } else {
        mappingType = null
      }
    }
    /**
     * [匹配方式，匹配属性，匹配数据]
     */
    return [mappingType, mappingAttrName, mappingDetail]
  }
}
/**
 * 连线样式
 */
export class EdgeStyleModel {
  /**
   *  构造函数
   * @param styleName 样式类型
   * @param currentStyleService 当前样式服务
   */
  constructor(styleName, currentStyleService) {
    this._styleName = styleName
    this._currentStyleService = currentStyleService
  }
  /**
   * 获取默认样式数据 
   */
  getDefaultValue() {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    return styleDetail._edgeDefaultValue[0].style[this._styleName]
  }
  /**
   * 设置默认值
   * @param value
   */
  setDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._edgeDefaultValue[0].style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除默认值
   * @param value
   */
  removeDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    delete (styleDetail._edgeDefaultValue[0].style)[this._styleName]
    styleDetail.build()
  }
  /**
   * 通过id获取直接传值数据
   * @param id 连线id
   * @return 
   */
  getBypass(id) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `edge[ id = '${id}' ]`,
        style: {}
      }
      styleDetail._edgeBypass.push(bypassStyle)
    }
    styleDetail.build()
    return bypassStyle.style[this._styleName] || null
  }
  /**
   * 通过id设置直接传值数据
   * @param id 连线id
   * @param value 设置连线数据
   */
  setBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `edge[ id = '${id}' ]`,
        style: {}
      }
      styleDetail._edgeBypass.push(bypassStyle)
    }
    bypassStyle.style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除直接传值数据
   * @param id 连线id
   */
  removeBypass(id) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[ id = '${id}' ]`
    })
    if (bypassStyle) {
      delete bypassStyle.style[this._styleName]
    }
    styleDetail.build()
  }
  /**
   * 获取间接匹配数据
   * @param attrName 属性名
   * @param attrValue 属性值
   */
  getDiscreteMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `edge[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._edgeDiscreteMapping.push(bypassStyle)
    }
    styleDetail.build()
    return mappingStyle.style[this._styleName]
  }
  /**
   * 设置间接匹配数据
   * @param attrName 属性名
   * @param attrValue 属性值
   * @param value 新值
   */
  setDiscreteMapping(attrName, attrValue, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._edgeDiscreteMapping, (item) => {
      return item.selector == `edge[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `edge[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._edgeDiscreteMapping.push(mappingStyle)
    }
    mappingStyle.style[this._styleName] = value
    styleDetail.build()
  }
  /**
   * 删除间接匹配数据
   * @param attrName 属性名
   * @param attrValue 属性值
   */
  removeDiscreteMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._edgeDiscreteMapping, (item) => {
      return item.selector == `edge[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (mappingStyle) {
      _.pull(styleDetail._edgeDiscreteMapping, mappingStyle)
    }
    styleDetail.build()
  }
  /**
   * 删除间接匹配数据,多个数据删除
   * @param attrName 属性名
   */
  removeDiscreteMappings(attrName) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    _.remove(styleDetail._edgeDiscreteMapping, (item) => {
      return new RegExp(`edge\\[${attrName} = '(.*)' \\]`).test(item.selector) && item.style[this._styleName]
    })
    styleDetail.build()
  }
  /**
   * 删除直接匹配数据
   * @param attrName 属性名
   * @param attrValue 属性值
   */
  setPassthroughMapping(attrName) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._edgePassthroughMapping[0].style[this._styleName] = `data(${attrName})`
    styleDetail.build()
  }

  /**
   * 删除直接匹配数据
   */
  removePassthroughMapping() {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    if (styleDetail._edgePassthroughMapping[0].style[this._styleName]) {
      delete styleDetail._edgePassthroughMapping[0].style[this._styleName]
    }
    styleDetail.build()
  }

  /**
   * 获取连线匹配数据
   * @return [匹配方式，匹配属性，匹配数据]
   */  
  getMappingInfo() {
    const passthrough = MappingTypeConstant.passthrough
    const discrete = MappingTypeConstant.discrete
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let passthroughMapping = styleDetail._edgePassthroughMapping[0]
    let discreteMapping = styleDetail._edgeDiscreteMapping
    let mappingType = null
    let mappingAttrName = null
    let mappingDetail = []
    if (passthroughMapping.style[this._styleName]) {
      mappingType = passthrough
      const styleValue = passthroughMapping.style[this._styleName]
      mappingAttrName = new RegExp('data\\((\\w+?)\\)').exec(styleValue)[1]

    } else {
      discreteMapping.forEach(item => {
        if (item.style[this._styleName]) {
          let reg = /edge\[(.*) = '(.*)' \]/gi;
          let [foo, attrName, attrValue] = reg.exec(item.selector)
          if (attrName && attrValue) {
            mappingAttrName = attrName
            mappingDetail.push([attrName, attrValue])
          }
        }
      })
      if (mappingDetail.length != 0) {
        mappingType = discrete
      } else {
        mappingType = null
      }
    }
    return [mappingType, mappingAttrName, mappingDetail]
  }
}
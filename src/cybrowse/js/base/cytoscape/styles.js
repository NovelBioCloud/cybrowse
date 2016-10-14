export const NodeStyleName = {
  backgroundColor: 'background-color'
}
export const EdgeStyleName = {

}

class StyleDetail {
  constructor(style) {
    this._style = style
    this._nodeDefaultValue = []
    this._edgeDefaultValue = []
    this._nodeMapping = []
    this._edgeMapping = []
    this._nodeBypass = []
    this._edgeBypass = []
    this._nodeSelected = []
    this._edgeSelected = []
    style.style.forEach((item) => {
      if (item.selector === 'node') {
        this._nodeDefaultValue.push(item)
      } else if (item.selector === 'edge') {
        this._edgeDefaultValue.push(item)
      } else if (/node\[/.test(item.selector)) {
        if (/node\[ id/.test(item.selector)) {
          this._nodeBypass.push(item)
        } else {
          this._nodeMapping.push(item)
        }
      } else if (/edge\[/.test(item.selector)) {
        if (/edge\[ id/.test(item.selector)) {
          this._edgeBypass.push(item)
        } else {
          this._edgeMapping.push(item)
        }
      } else if (/node:selected/.test(item.selector)) {
        this._nodeSelected = [item]
      } else if (/edge:selected/.test(item.selector)) {
        this._edgeSelected = [item]
      }
    })
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
    if (this._nodeSelected.length === 0) {
      this._nodeSelected.push({
        selector: 'node:selected',
        style: { "background-color": "rgb(255,255,0)" }
      })

    }
    if (this._edgeSelected.length === 0) {
      this._edgeSelected.push({
        selector: 'edge:selected',
        style: { "line-color": "rgb(255,0,0)" }
      })
    }
  }
  build() {
    this._style.style = [
      ...this._nodeDefaultValue,
      ...this._nodeMapping,
      ...this._nodeBypass,
      ...this._nodeSelected,
      ...this._edgeDefaultValue,
      ...this._edgeMapping,
      ...this._edgeBypass,
      ...this._edgeSelected
    ]
  }
}

export class NodeStyleModel {
  constructor(styleName, currentStyleService) {
    this._styleName = styleName
    this._currentStyleService = currentStyleService
  }
  setDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._nodeDefaultValue[0].style[this._styleName] = value
    styleDetail.build()
  }
  removeDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    delete (styleDetail._nodeDefaultValue[0].style)[this._styleName]
    styleDetail.build()
  }
  setBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `node[ id = '${id} ]`,
        style: {}
      }
      styleDetail._nodeBypass.push(bypassStyle)
    }
    bypassStyle.style[this._styleName] = value
    styleDetail.build()
  }
  removeBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[ id = '${id}' ]`
    })
    if (bypassStyle) {
      delete bypassStyle.style[this._styleName]
    }
    styleDetail.build()
  }
  setMapping(attrName, attrValue, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `node[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._nodeMapping.push(bypassStyle)
    }
    mappingStyle.style[this._styleName] = value
    styleDetail.build()
  }
  removeMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._nodeBypass, (item) => {
      return item.selector == `node[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (mappingStyle) {
      _.pull(styleDetail._nodeBypass, mappingStyle)
    }
    styleDetail.build()
  }
}

export class EdgeStyleModel {
  constructor(styleName, currentStyleService) {
    this._styleName = styleName
    this._currentStyleService = currentStyleService
  }
  setDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    styleDetail._edgeDefaultValue[0][this._styleName] = value
    styleDetail.build()
  }
  removeDefaultValue(value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    delete styleDetail._edgeDefaultValue[0][this._styleName]
    styleDetail.build()
  }
  setBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[ id = '${id}' ]`
    })
    if (!bypassStyle) {
      bypassStyle = {
        selector: `edge[ id = '${id} ]`,
        style: {}
      }
      styleDetail._edgeBypass.push(bypassStyle)
    }
    bypassStyle.style[this._styleName] = value
    styleDetail.build()
  }
  removeBypass(id, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let bypassStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[ id = '${id}' ]`
    })
    if (bypassStyle) {
      delete bypassStyle.style[this._styleName]
    }
    styleDetail.build()
  }
  setMapping(attrName, attrValue, value) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (!mappingStyle) {
      mappingStyle = {
        selector: `edge[${attrName} = '${attrValue}' ]`,
        style: {}
      }
      styleDetail._edgeMapping.push(bypassStyle)
    }
    mappingStyle.style[this._styleName] = value
    styleDetail.build()
  }
  removeMapping(attrName, attrValue) {
    let styleDetail = new StyleDetail(this._currentStyleService.getStyle())
    let mappingStyle = _.find(styleDetail._edgeBypass, (item) => {
      return item.selector == `edge[${attrName} = '${attrValue}' ]` && item.style[this._styleName]
    })
    if (mappingStyle) {
      _.pull(styleDetail._edgeBypass, mappingStyle)
    }
    styleDetail.build()
  }
}
import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import Color from 'color'
import { EdgeStyleName, EdgeStyleModel } from '../../../../base/cytoscape/styles'
import DataModel from '../../../../base/cytoscape/datas'

/**
 * lineColor 匹配传值面板
 */
export default class Mapping {
  /**
   * 构造方法
   */
  constructor() {
    this.flag = false
  }
  /**
   * 手动初始化方法
   * @param props 常规参数
   * @param context 上下文环境
   */
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  /**
   * 渲染视图
   */
  render() {
    const {
      props,
      context
    } = this
    const {
      mappingContainer,//小图标样式
      contentContainer,//匹配内容面板框
      dataModel,
      styleModel
    } = props
    const mappingViewModel = new MappingViewModel()
    const briefInfo = new BriefInfo()
    const contentInfo = new ContentInfo()
    briefInfo.init({
      styleModel,
      dataModel,
      container: mappingContainer
    }, this.context)
    contentInfo.init({
      mappingViewModel: mappingViewModel,
      styleModel,
      dataModel,
      container: contentContainer
    }, this.context)
    this.mappingViewModel = mappingViewModel
    mappingViewModel.init({
      briefInfo,
      contentInfo,
      dataModel,
      styleModel
    }, this.context)
  }
  /**
   * 更新视图
   */
  update() {
    this.mappingViewModel.update()
  }
}
/**
 * Mapping 的 ViewModel 对象
 */
class MappingViewModel extends EventEmitter {
  /**
   * 构造方法
   */
  constructor() {
    super()
    this._showContentInfo = false
    this._model = null
    this._mappingType = null
    this._attrName = null
    this._attrInfo = null
    this._modelProvider = null
    this._briefInfo = null
  }
  /**
   * 手动初始化方法
   * @param props 常规参数
   * @param context 上下文环境
   */
  init(props, context) {
    this.props = props
    this.context = context
    this._styleModel = props.styleModel
    this._briefInfo = props.briefInfo
    this._contentInfo = props.contentInfo
    this._briefInfo.setViewModel(this)
    this._contentInfo.setViewModel(this)
  }
  /**
   * 设置内容
   */
  set showContentInfo(value) {
    if (this._showContentInfo !== value) {
      this._showContentInfo = value
      this._contentInfo.updateDisplay()
    }
  }
  
  /** 是否显示内容 */
  get showContentInfo() {
    return this._showContentInfo
  }
  get briefInfoType() {
    let _briefInfoType
    const [mappingType, attrName, attrInfo] = this.props.styleModel.getMappingInfo()
    console.log([mappingType, attrName, attrInfo])
    if (!mappingType || !attrName) {
      _briefInfoType = true
    } else {
      _briefInfoType = false
    }
    return _briefInfoType
  }
  /** 更新小图表，如果样式中未设置匹配数据，小图表样式是默认状态，如果修改了匹配数据，小图表是激活样式 */
  updateBriefInfoType() {
    this._briefInfo.update()
  }
  update() {
    this._contentInfo.update()
    this._briefInfo.update()
  }
}
/** 前台界面 lineColor 选择栏目中，显示为一个图标，点击以后展示匹配框，再次点击，隐藏匹配框 */
class BriefInfo {
  init(props, context) {
    this.props = props
    this.context = context
    this.$container = $(props.container)
  }
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.update()
  }
  update() {
    this.$container.empty()
    let $el;
    if (this._viewModel.briefInfoType) {
      $el = $(`<div style='line-height:30px;text-align:center;'>
        <i class='fa fa-square-o fa-fw ac-pointer fa-lg'/>
      </div>`).appendTo(this.$container)
    } else {
      $el = $(`<div style='line-height:30px;text-align:center;'>
        <i class='fa fa-th-large fa-fw ac-pointer fa-lg'/>
      </div>`).appendTo(this.$container)
    }
    $el.click(() => {
      this._viewModel.showContentInfo = !this._viewModel.showContentInfo
    })
  }
}
/** 前台界面 lineColor 选择栏目中，实际内容的匹配框 */
class ContentInfo {
  init(props, context) {
    this.props = props
    this.context = context
    this._mappingViewModel = props.mappingViewModel
    this.$container = $(props.container)
  }
  /** 设置视图模型，然后渲染视图 */
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.render()
    this.updateDisplay()
  }

  render() {
    this.$container.empty()
    const $mappingType = $('<div/>', {
      style: 'line-height:30px'
    }).appendTo(this.$container)
    const $attrName = $('<div/>', {
      style: 'line-height:30px'
    }).appendTo(this.$container)
    const $attrInfo = $('<div/>').appendTo(this.$container)
    /** 内容视图模型 */
    const contentInfoViewModel = new ContentInfoViewModel()
    this.contentInfoViewModel = contentInfoViewModel
    /** 匹配类型 */
    const mappingType = new MappingType()
    /** 属性名 */
    const attrName = new AttrName()
    /** 属性信息 */
    const attrInfo = new AttrInfo()
    mappingType.init({
      container: $mappingType.get(0),
      styleModel: this.props.styleModel
    }, this.context)
    attrName.init({
      container: $attrName.get(0),
      styleModel: this.props.styleModel
    }, this.context)
    attrInfo.init({
      container: $attrInfo.get(0),
      styleModel: this.props.styleModel
    }, this.context)
    contentInfoViewModel.init({
      mappingType,
      attrName,
      attrInfo,
      mappingViewModel: this._viewModel,
      styleModel: this.props.styleModel
    }, this.context)
  }
  update() {
    this.contentInfoViewModel.update()
  }
  updateDisplay() {
    if (this._viewModel.showContentInfo) {
      this.$container.stop().show()
    } else {
      this.$container.stop().hide()
    }
  }
}
/**
 * 间接传值方式视图模型
 */
class ContentInfoViewModel {
  constructor() {
    this._attrName
    this._mappingType
    this._attrInfo
    this._styleModel
    this._mappingViewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.controls = context.controls
    this._styleModel = props.styleModel
    this._attrName = props.attrName
    this._mappingType = props.mappingType
    this._attrInfo = props.attrInfo
    this._mappingViewModel = props.mappingViewModel
    const currentDataControl = this.controls.currentDataControl
    this.edgeDataModel = new DataModel(currentDataControl).newEdgeDataModel()
    this._initProperties()
    this._attrInfo.setViewModel(this)
    this._attrName.setViewModel(this)
    this._mappingType.setViewModel(this)
  }
  _initProperties() {
    const [mappingType, attrName, attrInfo] = this._styleModel.getMappingInfo()
    this._selectedAttrName = attrName
    this._selectedType = mappingType
    this._activeInfo = attrInfo
  }
  updateBriefInfoType() {
    this._mappingViewModel.updateBriefInfoType()
  }
  get attrNames() {
    return this.edgeDataModel.getAttrNames()
  }
  get selectedAttrName() {
    return this._selectedAttrName
  }
  set selectedAttrName(value) {
    if (this._selectedAttrName) {
      if (this._selectedType === 'discrete') {
        this._styleModel.removeDiscreteMappings(this._selectedAttrName)
      } else if (this._selectedType === 'passthrough') {
        this._styleModel.removePassthroughMapping()
      }
    }
    this._selectedAttrName = value
    if (this._selectedAttrName) {
      if (this._selectedType === 'passthrough') {
        if (this._selectedAttrName) {
          this._styleModel.setPassthroughMapping(this._selectedAttrName)
        }
      }
    }
    this.context.controls.viewPanelControl.update()
    this._attrInfo.update()
    this.updateBriefInfoType()
  }
  get mappingTypes() {
    return ['discrete', 'passthrough']
  }
  get selectedType() {
    return this._selectedType
  }
  set selectedType(value) {
    if (this._selectedAttrName) {
      if (this._selectedType === 'discrete') {
        this._styleModel.removeDiscreteMappings(this._selectedAttrName)
      } else if (this._selectedType === 'passthrough') {
        this._styleModel.removePassthroughMapping()
      }
    }
    this._selectedType = value
    if (this._selectedAttrName) {
      if (this._selectedType === 'passthrough') {
        this._styleModel.setPassthroughMapping(this._selectedAttrName)
      }
    }
    this.context.controls.viewPanelControl.update()
    this._attrInfo.update()
    this.updateBriefInfoType()
  }
  getAttrValues() {
    if (this._selectedAttrName) {
      return this.edgeDataModel.getAttrValues(this._selectedAttrName)
    } else {
      return []
    }
  }
  get attrInfos() {
    const tempMap = new Map()
    _.each(this.getAttrValues(), (attrName) => {
      tempMap.set(attrName, null)
    })
    _.each(this._activeInfo, (attrInfo) => {
      tempMap.set(attrInfo[0], attrInfo[1] || null)
    })
    return [...tempMap]
  }
  set activeAttrInfos(value) {
    throw new Error('todo')
  }
  update() {
    this._attrInfo.update()
    this._attrName.update()
    this._mappingType.update()
  }
}

/**
 * 间接传值类型选择，直接匹配和间接匹配
 */
class MappingType extends EventEmitter {
  constructor() {
    super()
    this._viewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.$container = $(props.container)
  }
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.update()
  }

  update() {
    this.$container.empty()
    const $el = $(`
      <div style='display:flex'>
        <div style='width:100px;line-height:30px'><label>匹配方式</label></div>
        <div style='width:200px;line-height:30px' class='fn-select'></div>
      </div>`).appendTo(this.$container)
    const $select = $(_.template(`
      <select class='form-control input-sm'>
        <option value=''>--请选择--</option>
        <%_.each(mappingTypes,(mappingType)=>{%>
        <option value='<%=mappingType%>'><%=mappingType%></option>
        <%})%>
      </select`)({
        mappingTypes: this._viewModel.mappingTypes
      }))
      .appendTo($el.find('.fn-select'))
    if (this._viewModel.selectedType) {
      $select.val(this._viewModel.selectedType)
    } else {
      $select.val('')
    }
    $select.change((event) => {
      this._viewModel.selectedType = event.target.value
    })
  }
}

/**
 * 属性名修改
 */
class AttrName extends EventEmitter {
  constructor() {
    super()
    this._viewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.$container = $(props.container)
  }
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.update()
  }
  update() {
    this.$container.empty()
    const $el = $(`
      <div style='display:flex'>
        <div style='width:100px;line-height:30px'><label>匹配属性</label></div>
        <div style='width:200px;line-height:30px' class='fn-select'></div>
      </div>`).appendTo(this.$container)

    const $select = $(_.template(`
      <select class='form-control input-sm'>
        <option value=''>--请选择--</option>
        <%_.each(attrNames,(attrName)=>{%>
        <option value='<%=attrName%>'><%=attrName%></option>
        <%})%>
      </select`)({
        attrNames: this._viewModel.attrNames
      })).appendTo($el.find('.fn-select'))
    if (this._viewModel.selectedAttrName) {
      $select.val(this._viewModel.selectedAttrName)
    } else {
      $select.val('')
    }
    $select.change((event) => {
      this._viewModel.selectedAttrName = event.target.value
    })
  }
}

/**
 * 属性内容
 */
class AttrInfo extends EventEmitter {
  constructor() {
    super()
    this._viewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.$container = $(props.container)
    this._styleModel = props.styleModel
  }
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.update()
  }
  update() {
    this.$container.empty()
    if (!this._viewModel.selectedAttrName || !this._viewModel.selectedType) {
      //do nothing 
    } else {
      if (this._viewModel.selectedType === 'discrete') {
        const $el = $('<div/>').css({ 'max-height': '150px', overflow: 'auto' }).appendTo(this.$container)
        console.log(this._viewModel.attrInfos)
        this._viewModel.attrInfos.forEach((item) => {
          const $itemContainer = $('<div/>').css({
            'height': '30px',
            'line-height': '30px'
          }).appendTo($el)
          /**
           * 属性修改元素视图模型
           */
          const attrItemViewModel = new AttrItemViewModel()
          const attrItem = new AttrItem()
          attrItem.init({
            container: $itemContainer.get(0),
            contentInfoViewModel: this._viewModel
          }, this.context)
          attrItemViewModel.init({
            styleModel: this._styleModel,
            contentInfoViewModel: this._viewModel,
            attrItem,
            attrName: this._viewModel.selectedAttrName,
            attrValue: item[0],
            styleValue: item[1],
          }, this.context)
          attrItemViewModel.ready()
        })
      }
    }
  }
}
/**
 * 属性修改元素视图模型
 */
class AttrItemViewModel {
  constructor() {
    this._attrItem
    this._attrName
    this._attrValue
    this._styleValue
    this._contentInfoViewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this._styleModel = props.styleModel
    this._attrItem = props.attrItem
    this._attrName = props.attrName
    this._attrValue = this.props.attrValue
    this._styleValue = props.styleValue
    this._contentInfoViewModel = props.contentInfoViewModel
  }

  ready() {
    this._attrItem.setViewModel(this)
  }
  get attrValue() {
    return this._attrValue
  }
  get styleValue() {
    return this._styleValue
  }
  set styleValue(value) {
    if (value) {
      this._styleModel.setDiscreteMapping(this._attrName, this._attrValue, value)
    } else {
      this._styleModel.removeDiscreteMapping(this._attrName, this._attrValue)
    }
    this.context.controls.viewPanelControl.update()
    this._styleValue = value
    this._attrItem.update()
    this._contentInfoViewModel.updateBriefInfoType()
  }
}

/**
 * 属性修改元素
 */
class AttrItem extends EventEmitter {
  constructor() {
    super()
    this._viewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.$container = $(props.container)
  }
  setViewModel(viewModel) {
    this._viewModel = viewModel
    this.update()
  }

  update() {
    this.$container.empty()
    $('<label/>', {
      style: 'width:100px',
      text: this._viewModel.attrValue
    }).appendTo(this.$container)
    const $colorContainer = $('<span/>', {
      style: 'width:100px'
    }).appendTo(this.$container)
    new ColorComponent().init({
      container: $colorContainer.get(0),
      styleValue: this._viewModel.styleValue,
      onChange: (event) => {
        this._viewModel.styleValue = event.target.value
      },
      onRemove: (event) => {
        this._viewModel.styleValue = ''
      }
    })
  }
}

/**
 * 颜色选择组件
 */
class ColorComponent {
  init({
    container,
    onChange,
    onRemove,
    styleValue,
  }) {
    const $container = $(container)
    if (styleValue) {
      const inputValue = new Color(styleValue).hexString()
      const $input = $(`<input type='color' value='${inputValue}' class='ac-pointer'/> `).appendTo($container)
      $input.change((event) => {
        onChange && onChange(event)
      })

      const $remove = $(`<i class='fa fa-times fa-fw fa-lg ac-pointer'></i>`).appendTo($container)
      $remove.click((e) => {
        onRemove && onRemove(event)
      })

    } else {
      const $input = $(`<input type='color' value='#E0E0E0' style='border-color: transparent;' class='ac-pointer'/> `).appendTo($container)
      $input.change((event) => {
        onChange && onChange(event)
      })
    }
  }
}
import $ from 'jquery'
import _ from 'lodash'
import EventMitter from 'events'


export class TabPanelModel extends EventMitter {
  constructor() {
    super()
    this.tabPanelEntries = []
    this.focus = -1
  }
  setEntries(tabPanelEntries, focus = 0) {
    if (!_.isArray(tabPanelEntries)) {
      throw new Error('input value must be an array')
    }
    this.tabPanelEntries = tabPanelEntries
    this._setFocus(focus)
    this.emit('update')
  }
  add(tabPanelEntry) {
    this.tabPanelEntries.push(tabPanelEntry)
    this.focus = this.tabPanelEntries.length
    this.emit('add', tabPanelEntry)
  }
  remove(tabPanelEntry) {
    let curFocus = this.focus
    let tabPanelEntryIndex = _.findIndex(this.tabPanelEntries, tabPanelEntry)
    if (curFocus > tabPanelEntryIndex) {
      this.focus = curFocus - 1
    }
    _.pull(this.tabPanelEntries, tabPanelEntry)
    this.emit('remove', tabPanelEntry)
  }
  getTabPanelEntries() {
    return this.tabPanelEntries
  }
  getFocus() {
    return this.focus
  }
  setFocus(indexOrTabPanelEntry) {
    this._setFocus(indexOrTabPanelEntry)
    this.emit('focus', this.focus)
  }
  _setFocus(indexOrTabPanelEntry) {
    const index = indexOrTabPanelEntry
    const tabPanelEntry = indexOrTabPanelEntry
    if (_.isNumber(index)) {
      if (0 <= index && index < this.tabPanelEntries.length) {
        this.focus = index
      }
    } else {
      let tabPanelEntryIndex = _.findIndex(this.tabPanelEntries, tabPanelEntry)
      if (tabPanelEntryIndex > -1) {
        this.focus = tabPanelEntryIndex
      }
    }
  }
}
export class TabPanelView extends EventMitter {

  constructor() {
    super()
    this._toDispose = []
  }
  init(props, content) {
    this.props = props
    this.content = content
  }

  setModel(tabPanelModel) {
    this.tabPanelModel = tabPanelModel
    this.registerListener()
    this.update()
  }
  registerListener() {
    this.dispose()
    const tabPanelModel = this.tabPanelModel
    const toDispose = ['update', 'focus', 'add', 'remove'].map((item) => {
      const listener = (...data) => {
        this.doAction(item, ...data)
      }
      tabPanelModel.addListener(item, listener)
      return {
        toDispose: () => {
          tabPanelModel.removeListener(item, listener)
        }
      }
    })
  }
  doAction(action, ...data) {
    switch (action) {
      case 'update':
        this.update(...data)
        break
      case 'focus':
        this.focus(...data)
        break
      case 'add':
        this.add(...data)
        break
    }
  }
  update() {
    this.$el = $('<div/>').appendTo($(this.props.container))
    this.$title = $(`
      <ul class="fn-title nav nav-tabs" role="tablist"></ul>
    `).appendTo(this.$el)
    this.$content = $(`
      <div class="fn-content tab-content"></div>
    `).appendTo(this.$el)
    this.tabPanelModel.getTabPanelEntries().forEach((tabPanelEntry) => {
      this.$title.append($(`
        <li role="presentation">
          <a href="#${tabPanelEntry.id}" role="tab" data-toggle="tab">
            ${tabPanelEntry.name}
          </a>
        </li>`
      ))
      this.$content.append($(`
        <div role="tabpanel" class="tab-pane" id="${tabPanelEntry.id}">
        </div>
      `))
      tabPanelEntry.callback && tabPanelEntry.callback(this.$content.find('.tab-pane:last').get(0))
    })
    this.updateFocus()
  }
  add(tabPanelEntry) {
    const $titleContainer = $(`
        <li role="presentation">
          <a href="#${tabPanelEntry.id}" role="tab" data-toggle="tab">
            ${tabPanelEntry.name}
          </a>
        </li>`
    )
    this.$title.append($titleContainer)
    const $tabContainer = $(`
        <div role="tabpanel" class="tab-pane" id="${tabPanelEntry.id}"></div>
      `)
    this.$content.append($tabContainer)
    tabPanelEntry.callback && tabPanelEntry.callback($tabContainer.get(0))
    this.updateFocus()
  }
  updateFocus() {
    const index = this.tabPanelModel.getFocus()
    this.focus(index)
  }
  focus(index) {
    this.$title.find(`a`).eq(index).tab('show')
  }
  dispose() {
    if (this._toDispose.length > 0) {
      this._toDispose.forEach((disposable) => {
        disposable.dispose()
      })
      this._toDispose = []
    }
    this.$el && this.$el.remove()
  }
}
export default class TabPanel {

  init(props, context, options) {
    this.context = context
    this.model = new TabPanelModel()
    this.model.setEntries(props.entries)
    this.view = new TabPanelView()
    this.view.init({ container: props.container })
    this.view.setModel(this.model)
  }

  setEntries(tabPanelEntries) {
    this.model.setEntries(tabPanelEntries)
  }

  addPanel(tabPanelEntry) {
    this.model.add(tabPanelEntry)
  }

  removePanel(tabPanelEntry) {
    this.model.remove(tabPanelEntry)
  }

  focus(tabPanelEntry) {
    this.model.focus(tabPanelEntry)
  }
  dispose() {
    this.view.dispose()
  }
}
import $ from 'jquery'
import _ from 'lodash'

/** table 节点数据面板 */
export default class TableNodePanel {

  constructor() {
  }

  init(props, context) {
    const container = props.container
    const $el = $('<div/>').appendTo($(container))
    this.$el = $el
  }
  update(nodeElements) {
    const nodeDatas = _.map(nodeElements, (item) => {
      return item.data
    })
    let $el = this.$el

    let $table = $('<table/>', { class: 'table' })
    let keys = []
    _.each(nodeDatas, (data) => {
      keys.push(_.keys(data))
    })
    keys = _.concat(...keys)
    keys = _.uniq(keys)
    let $title = $('<thead/>').appendTo($table)
    let $thead = $('<tr/>').appendTo($title)
    _.each(keys, (key) => {
      $('<td/>').appendTo($thead).html(key)
    })

    let $content = $('<tbody/>').appendTo($table)
    _.each(nodeDatas, (data) => {
      let $row = $('<tr/>').appendTo($content)
      _.each(keys, (key) => {
        let value = data[key]
        $(`<td>${value}</td>`).appendTo($row)

      })
    })
    $el.empty()
    $el.append($table)
  }
}
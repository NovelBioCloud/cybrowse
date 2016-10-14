import $ from 'jquery'
export default class TableNodePanel {

  constructor() {
  }

  init(props, context) {
    const container = props.container
    const $el = $('<div/>').appendTo($(container))
    $el.html('node info')
  }

}
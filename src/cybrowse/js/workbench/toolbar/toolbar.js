import $ from 'jquery'

export default class Toolbar {

  constructor() { }

  init(props, context) {
    this.props = props
    this.context = context
    this.container = props.container
    this.render()
  }

  render() {
    let container = this.container
    const $el = $('<div/>', {
      text: 'toolbar',
      role: 'toolbar'
    }).appendTo($(this.props.container))

  }
  destroy() {
    this.$el.remove()
  }

}
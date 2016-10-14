import $ from 'jquery'

export default class EdgeStyle {
  constructor() {

  }
  init(props, context) {
    this.container = props.container
    this.$el = $("<div/>").appendTo($(this.container))
    
  }
}
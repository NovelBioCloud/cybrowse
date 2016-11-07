import createCytoscape from 'cytoscape'
import $ from 'jquery'
/**cytoscape包装类 */
export default class Cytoscape {

  init(props, context) {
    this.container = props.container
    this.el = $('<div/>').css({
      'width': '1200px',
      'height': '600px',
      'background': '#f4f4f4'
    }).appendTo($(this.container)).get(0)
    this.cy = createCytoscape({
      container: this.el,
      style: [],
      layout: [],
      boxSelectionEnabled: true,
    });
  }
  dispose() {
    this.cy.destroy()
    this.el = null
  }
  get() {
    return this.cy
  }
}
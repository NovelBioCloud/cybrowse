import createCytoscape from 'cytoscape'
import $ from 'jquery'

export default class Cytoscape {

  init(props,context){
    this.container = props.container
    this.el = $('<div/>',{
      style:'height:400px;background:#f4f4f4;'
    }).appendTo($(this.container)).get(0)
    this.cy = createCytoscape({
			container: this.el,
			style: [],
			layout: []
		});
  }
  dispose(){
    this.cy.destroy()
    this.el = null
  }
  repaint(){
    this.cy.remove(this.cy.elements())
  }
}
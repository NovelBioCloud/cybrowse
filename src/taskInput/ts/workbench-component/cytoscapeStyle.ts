
export const style = {
  node: {
    'shape': 'roundrectangle',
    'width': '200',
    'height': '120',
    'content': 'data(name)',
    'font-size': '30px',
    'font-weight': '500',
    'background-color': '#F9F9FA',
    'text-outline-color': 'data(faveColor)',
    'text-border-width': '1',
    'text-border-style': 'solid',
    'text-border-color': 'data(faveColor)',
    //			'text-max-width' : '80',
    'text-halign': 'center',
    'text-valign': 'center',
    //			'text-margin-x' : '80',
    'border-width': '6',
    //			'border-style' : 'ridge',
    //			'padding-left' : '10',
    'border-color': 'data(faveColor)',
    'color': '#333333'
  },
  edge: {
    'target-arrow-shape': 'triangle',
    'width': 5,
    'curve-style': 'unbundled-bezier',
    'control-point-distances': '5 -5',
    'control-point-weights': '0.25 0.75',
    'line-color': '#A8BEDC',
    'target-arrow-color': '#A8BEDC'
  },
  selectedNode: {
    'border-color': '#0cf'
  },
  selectedEdge: {
    // 'line-color': '#0cf',
  }
}

/**
 * cytoscape 的事件
 */
const cytoscapeEvents = {
  tapstart: 'tapstart',//点击开始事件
  tapdrag: 'tapdrag',//拖动事件
  tapdragover: 'tapdragover',//拖动过程事件
  tapdragout: 'tapdragout',//拖出事件
  tapend: 'tapend',//点击结束事件
  tap: 'tap',//点击事件
  taphold: 'taphold',//...
  cxttapstart: 'cxttapstart',//右键点击开始事件
  cxttapend: 'cxttapend',//右键点击结束
  cxttap: 'cxttap',//右键点击
  cxtdrag: 'cxtdrag',//右键拖动
  cxtdragover: 'cxtdragover',//右键拖动中
  cxtdragout: 'cxtdragout',//右键拖动出
  boxstart: 'boxstart',//框选开始
  boxend: 'boxend',//框选结束
  boxselect: 'boxselect',//
  box: 'box'//框选
}

export default cytoscapeEvents
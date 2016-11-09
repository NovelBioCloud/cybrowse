import _ from 'lodash'
import fs from 'fs'
import { Readable, Writable } from 'stream'
import csv from 'csv'
import Readline from 'readline'
import through2 from 'through2'
/** 文件解析类 */
export default class FileResolver {
  init(props, context) {
    const fileModel = props.fileModel
    const file = fileModel.file
    if (/\.txt$/.test(file.name)) {
      new PlainFileResolver().init(props, context).resolve()
    } else if (/\.xls$/.test(file.name)) {
      // new XlsFileResolver().init(props, context).resolve()
      new PlainFileResolver().init(props, context).resolve()
    }
  }
}
/** txt文件解析类 */
class PlainFileResolver {
  constructor() {
  }
  init(props, context) {
    this.props = props
    this.context = context
    return this
  }
  resolve() {
    const fileModel = this.props.fileModel
    const file = fileModel.file
    const fileReader = new FileReader()
    fileReader.onloadend = (event) => {
      const content = event.target.result
      new ContentResolver().init({
        fileModel,
        callback: this.props.callback,
        content: content,
      }, this.context).resolve()
    }
    fileReader.readAsText(file)
  }

}
/**数据解析类 */
class ContentResolver {
  init(props, context) {
    this.props = props
    this.context = context
    return this
  }
  resolve() {
    const content = this.props.content
    const lines = content.split('\n')
    const fileModel = this.props.fileModel
    let sourceSeq, targetSeq, relationSeq
    const sourceName = fileModel.source, targetName = fileModel.target, relationName = fileModel.relation
    /**
     * 获取数据使用的列名
     */
    if (fileModel.type === 'seq') {
      sourceSeq = parseInt(sourceName)
      targetSeq = parseInt(targetName)
      relationSeq = parseInt(relationName)
    } else {
      const firstLine = lines[0]
      const columns = firstLine.split('\t')
      _.each(columns, (column, index) => {
        if (column === sourceName) {
          sourceSeq = index
        }
        if (column === targetName) {
          targetSeq = index
        }
        if (column === relationName) {
          relationSeq = index
        }
      })
    }
    /**
     * 根据需要过滤第一行数据
     */
    if (fileModel.filterFirstLine) {
      lines.shift()
    }
    /**
     * 解析数据
     */
    const datas = paraseBody(lines, sourceSeq, targetSeq, relationSeq)
    const nodeMap = new Map()
    const nodes = []
    const edges = []
    let nodeId = 1
    /** 将当前数据解析为cytoscape需要的节点数据类型 */
    _.each(datas, (data) => {
      _.each([data[0], data[1]], (item) => {
        let nodeName = item
        if (!nodeMap.has(nodeName)) {
          nodeMap.set(nodeName, nodeId.toString())
        }
        nodeId++
      })
    })
    for (let [key, value] of nodeMap) {
      nodes.push({
        data: {
          id: value,
          name: key
        },
        position: {
          x: 0,
          y: 0
        }
      })
    }
    /** 将当前数据解析为cytoscape需要的连线数据类型 */
    let edgeId = 1
    _.each(datas, (data) => {
      let source = nodeMap.get(data[0])
      let target = nodeMap.get(data[1])
      edges.push({
        data: {
          id: edgeId.toString(),
          source: source,
          target: target,
          name: data[2] || ''
        }
      })
      edgeId++
    })
    /** 使用回调方法，处理cytoscape类型的数据 */
    this.props.callback && this.props.callback(nodes, edges)
  }
}

/**
 * 将文本数据中需要的数据提取出来（提取source,target,relation）
 */
function paraseBody(lines, sourceSeq, targetSeq, relationSeq) {
  return _.filter(_.map(lines, (line) => {
    const columns = line.split('\t')
    return [columns[sourceSeq], columns[targetSeq], columns[relationSeq], line]
  }), (data) => {
    return data[0] && data[1]
  })
}
/**
 * excel文件解析类
 * 该文件解析暂时没有实现
 */
class XlsFileResolver {
  constructor() {
  }
  init(props, context) {
    this.props = props
    this.context = context
    return this
  }
  resolve() {
    const fileModel = this.props.fileModel
    const file = fileModel.file
    const fileReader = new FileReader()
    fileReader.onload = (...args) => {
      console.log(...args)
    }
    console.log(fileReader.readAsText(file))
  }
}
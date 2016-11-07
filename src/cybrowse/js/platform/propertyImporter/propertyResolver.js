import _ from 'lodash'
import fs from 'fs'
import { Readable, Writable } from 'stream'
import csv from 'csv'
import Readline from 'readline'
import through2 from 'through2'
/** 属性文件解析类 */
export default class PropertyResolver {
  init(props, context) {
    const fileModel = props.fileModel
    const file = fileModel.file
    if (/\.txt$/.test(file.name)) {
      new PlainFileResolver().init(props, context).resolve()
    } else if (/\.xls$/.test(file.name)) {
      // new XlsPropertyResolver().init(props, context).resolve()
      new PlainFileResolver().init(props, context).resolve()
    }
  }
}
/** txt文件解析类 */
class PlainFileResolver {
  constructor() { }
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
    let idSeq
    const idName = fileModel.id
    const firstLine = lines[0]
    const columns = firstLine.split('\t')
    if (fileModel.type === 'seq') {
      idSeq = parseInt(idName)
    } else {
      _.each(columns, (column, index) => {
        if (column === idName) {
          idSeq = index
        }
      })
    }
    lines.shift()
    const datas = paraseBody(lines, columns, idSeq)
    this.props.callback && this.props.callback(datas, columns[idSeq])
  }
}

function paraseBody(lines, titleColumns, idSeq) {
  return _.filter(_.map(lines, (line) => {
    const columns = line.split('\t')
    const data = { data: {} }
    _.each(titleColumns, (titleColumn, index) => {
      data.data[titleColumn] = columns[index]
    })
    return data
  }), (data) => {
    return data.data[titleColumns[idSeq]]
  })
}
/** excel文件解析类 */
class XlsPropertyResolver {
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
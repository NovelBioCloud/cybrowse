import {
  EventEmitter
} from 'events'
import $ from 'jquery'
import _ from 'lodash'

import Instantiation from '../../platform/instantiation/instantiation'
import ConfigControl from '../config/configControl'

/** 
 * 运行实例服务，构造Instantiation，该类没有实际的业务功能
 */
export default class InstantiationControl {

  init(props, context) {
    this.props = props
    this.context = context

    const configControl = new ConfigControl()
    context.controls.configControl = configControl

    this.instantiation = new Instantiation()
    this.instantiation.init(props, context)

  }
}
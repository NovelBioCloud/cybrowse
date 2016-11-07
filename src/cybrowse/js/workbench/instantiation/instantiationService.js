import {
  EventEmitter
} from 'events'
import $ from 'jquery'
import _ from 'lodash'

import Instantiation from '../../platform/instantiation/instantiation'

/**运行实例服务 */
export default class InstantiationService {

  init(props, context) {
    this.props = props
    this.context = context

    const configService = new ConfigService()
    context.services.configService = configService

    this.instantiation = new Instantiation()
    this.instantiation.init(props, context)

  }
}
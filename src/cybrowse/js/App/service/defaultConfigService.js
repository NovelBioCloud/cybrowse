import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

class DefaultConfigService {
  loadConfig() {
    return $.getJSON('data/data.json')
  }
}

const defaultConfigService = new DefaultConfigService()
export default defaultConfigService;

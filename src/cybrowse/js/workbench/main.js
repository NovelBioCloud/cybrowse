import $ from 'jquery'
import _ from 'lodash'

import Workbench from './Workbench'
import {
  Singletons
} from '../base/common'
import CommandService from './command/commandService'


function openWorkspace() {
  return new Promise(function (c, r) {
    let workbench = new Workbench()
    workbench.init({
      test: 'test'
    }, {
      services: new Singletons()
    })
    c()
  })
}

function resolveWorkspaceConfig() {
  return new Promise(function (c, r) {
    c()
  })
}

function resolveNlsConfig() {
  return new Promise(function (c, r) {
    c()
  })
}

function start() {
  resolveNlsConfig().then(() => {
    resolveWorkspaceConfig().then(() => {
      openWorkspace().then(() => {
        console.log('finish')
      })
    })
  })
}
export default start
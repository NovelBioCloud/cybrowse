import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'
import {
	eventDispatcher,
	defaultConfigService
} from '../service'

const DefaultConfigStoreEvent = {
	loadConfig: 'defaultConfig.loadConfig',
	reloadConfig: 'defaultConfig.reloadConfig'
}

class DefaultConfigStore {
	defaultConfig = null
	loadConfig() {
		if (this.defaultConfig) {
			return Promise.resolve(this.defaultConfig)
		} else {
			return defaultConfigService.loadConfig().then((data) => {
				this.defaultConfig = data
				eventDispatcher.channel().publish(DefaultConfigStoreEvent.loadConfig, data)
			})
		}
	}
	reloadConfig() {
		return defaultConfigService.loadConfig().then((data) => {
			this.defaultConfig = data
			eventDispatcher.channel().publish(DefaultConfigStoreEvent.reloadConfig, data)
		})
	}
}

const defaultConfigStore = new DefaultConfigStore()
export default defaultConfigStore

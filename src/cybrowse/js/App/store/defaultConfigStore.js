import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

class DefaultConfigStore {
	defaultConfig = null
	loadConfig() {
		if (this.defaultConfig) {
			return Promise.resolve(this.defaultConfig)
		} else {
			return $.getJSON('data/data.json').then((data) => {
				this.defaultConfig = data
			})
		}

	}
}

const defaultConfigStore = new DefaultConfigStore()
export default defaultConfigStore;

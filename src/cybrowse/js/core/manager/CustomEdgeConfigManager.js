import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

function CustomLayoutConfigService() {
	this.compute = (data) => {
		//TODO
		return data
	}
}

export default function CustomEdgeConfigManager(dataManager) {
	assert(dataManager)
	let customLayoutConfig
	let customLayoutConfigService = new CustomLayoutConfigService()

	this.getData = () => {
		return customLayoutConfig
	}
	computeCustomLayoutConfig()

	function computeCustomLayoutConfig() {
		let data = dataManager.getData()
		customLayoutConfig = customLayoutConfigService.compute(data)
	}

}

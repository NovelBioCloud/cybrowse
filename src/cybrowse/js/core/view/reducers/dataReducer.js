import {
	DATA__LOAD_DATA
} from '../constants/DataTypes'

function customNetworkConfigProcessor(data) {
	return {
		data: 1
	}
}

function computedNetworkConfigProcessor(defaultNetworkConfig, customNetworkConfig) {
	return {
		data: 2
	}
}

function customNodeConfigProcessor(data) {
	return {
		data: 3
	}
}

function computedNodeConfigProcessor(defaultNetworkConfig, customNetworkConfig) {
	return {
		data: 4
	}
}

function customEdgeConfigProcessor(data) {
	return {
		data: 5
	}
}

function computedEdgeConfigProcessor(defaultNetworkConfig, customNetworkConfig) {
	return {
		data: 6
	}
}

function loadData(state, action) {
	let customNetworkConfig = customNetworkConfigProcessor(action.data);
	let computedNetworkConfig = computedNetworkConfigProcessor(state.defaultNetworkConfig, customNetworkConfig);
	let customNodeConfig = customNodeConfigProcessor(action.data);
	let computedNodeConfig = computedNodeConfigProcessor(state.defaultNodeConfig, customNodeConfig);
	let customEdgeConfig = customEdgeConfigProcessor(action.data);
	let computedEdgeConfig = computedEdgeConfigProcessor(state.defaultEdgeConfig, customEdgeConfig);
	let newState = {
		...state,
		data: action.data,
		customNetworkConfig: customNetworkConfig,
		computedNetworkConfig: computedNetworkConfig,
		customNodeConfig: customNodeConfig,
		computedNodeConfig: computedNodeConfig,
		customEdgeConfig: customEdgeConfig,
		computedEdgeConfig: computedEdgeConfig,
	}
	return newState
}
export default function dataReducer(state, action) {
	switch (action.type) {
	case DATA__LOAD_DATA:
		return loadData(state, action)
	default:
		return {
			...state
		}
	}
}

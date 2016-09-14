import {
	DEFAULT_CONFIG__LOAD_DEFAULT_CONFIG
} from '../constants/DefaultConfigTypes'

const initialState = {}

function defaultNetworkConfigProcessor(defaultConfig) {
	return {
		background: 'red'
	}
}

function defaultNodeConfigProcessor(defaultConfig) {
	return {
		color: 'black'
	}
}

function defaultEdgeConfigProcessor(defaultConfig) {
	return {
		border: '1px solid'
	}
}

function loadDefaultConfig(state, action) {
	return {
		...state,
		defaultConfig: action.data,
		defaultNetworkConfig: defaultNetworkConfigProcessor(action.data),
		defaultNodeConfig: defaultNodeConfigProcessor(action.data),
		defaultEdgeConfig: defaultEdgeConfigProcessor(action.data)
	}
}
export default function defaultConfigReducer(state = initialState, action) {
	switch (action.type) {
	case DEFAULT_CONFIG__LOAD_DEFAULT_CONFIG:
		return loadDefaultConfig(state, action)
	default:
		return state
	}
}

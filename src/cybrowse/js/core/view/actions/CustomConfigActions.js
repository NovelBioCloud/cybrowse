import {
	CustomConfigTypes as types
} from '../constants'

export function networkUpdate(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NETWORK_UPDATE,
		data
	}
}
export function nodeUpdate(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NODE_UPDATE,
		data
	}
}
export function edgeUpdate(key, value) {
	return {
		type: types.CUSTOM_CONFIG__EDGE_UPDATE,
		data
	}
}
export function networkRemove(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NETWORK_REMOVE,
		key,
		value
	}
}
export function nodeRemove(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NODE_REMOVE,
		key,
		value
	}
}
export function edgeRemove(key, value) {
	return {
		type: types.CUSTOM_CONFIG__EDGE_REMOVE,
		key,
		value
	}
}
export function networkReset(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NETWORK_RESET,
		key,
		value
	}
}
export function nodeReset(key, value) {
	return {
		type: types.CUSTOM_CONFIG__NODE_RESET,
		key,
		value
	}
}
export function edgeReset(key, value) {
	return {
		type: types.CUSTOM_CONFIG__EDGE_RESET,
		key,
		value
	}
}

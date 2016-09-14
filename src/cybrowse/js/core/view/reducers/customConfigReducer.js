import {
	CUSTOM_CONFIG__NETWORK_UPDATE,
	CUSTOM_CONFIG__NODE_UPDATE,
	CUSTOM_CONFIG__EDGE_UPDATE,
	CUSTOM_CONFIG__NETWORK_REMOVE,
	CUSTOM_CONFIG__NODE_REMOVE,
	CUSTOM_CONFIG__EDGE_REMOVE,
	CUSTOM_CONFIG__NETWORK_RESET,
	CUSTOM_CONFIG__NODE_RESET,
	CUSTOM_CONFIG__EDGE_RESET
} from '../constants/CustomConfigTypes'

function networkUpdate(state, action) {
	return state
}
export default function dataReducer(state, action) {
	console.log(action)
	switch (action.type) {
	case CUSTOM_CONFIG__NETWORK_UPDATE:
		return networkUpdate(state, action)
	default:
		return state
	}
}

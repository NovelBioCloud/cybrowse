import {
	DefaultConfigTypes as types
} from '../constants'
export function loadDefaultConfig(data) {
	return {
		type: types.DEFAULT_CONFIG__LOAD_DEFAULT_CONFIG,
		data
	}
}

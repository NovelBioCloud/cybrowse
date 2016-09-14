import {
	DataTypes as types
} from '../constants'
export function loadData(data) {
	return {
		type: types.DATA__LOAD_DATA,
		data
	}
}

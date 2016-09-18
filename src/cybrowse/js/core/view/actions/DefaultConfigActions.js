import $ from 'jquery'
import {
	DefaultConfigTypes as types
} from '../constants'
export function loadDefaultConfig(data) {

	return (dispatch) => {
		$.getJSON('data/data.json').then((data) => {
			dispatch({
				type: types.DEFAULT_CONFIG__LOAD_DEFAULT_CONFIG,
				data
			})
		})
	}

}

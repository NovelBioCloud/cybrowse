import {
	combineReducers
} from 'redux'
import _ from 'lodash'
import defaultConfigReducer from './defaultConfigReducer'
import dataReducer from './dataReducer'
import customConfigReducer from './customConfigReducer'

export default function rootReducer(state = {}, action) {
	if (_.startsWith(action.type, "DEFAULT_CONFIG__")) {
		let newState = defaultConfigReducer(state, action)
		console.log(newState)
		return newState
	}
	if (_.startsWith(action.type, "DATA__")) {
		let newState = dataReducer(state, action)
		console.log(newState)
		return newState
	}
	if (_.startsWith(action.type, "CUSTOM_CONFIG__")) {
		let newState = customConfigReducer(state, action)
		console.log(newState)
		return newState
	}
	let newState = state
	console.log(newState)
	return newState

}

import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import async from 'async';
import assert from 'assert';
import {
	createStore,
	applyMiddleware
} from 'redux'
class StoreUtilClass {
	getStore() {
		let reducer = function (state = 1, action) {
			return state;
		};
		const store = createStore(
			reducer,
			applyMiddleware()
		);
		return store;
	}
}
const StoreUtil = new StoreUtilClass();
export default StoreUtil;

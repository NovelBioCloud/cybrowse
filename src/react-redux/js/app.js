import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	combineReducers,
	bindActionCreators
} from 'redux';
import {
	Provider,
	connect
} from 'react-redux';
import $ from 'jquery';
import App from './App';

function reducer(state = {}, action) {
	switch (action.type) {
	case "1":
		return Object.assign({}, state, {
			data: 1
		});
	case "2":
		return Object.assign({}, state, {
			data: 2
		});
	}
	return state;
}

function reducer2(state = {}, action) {
	switch (action.type) {
	case "a":
		return Object.assign({}, state, {
			data1: "a"
		});
	case "b":
		return Object.assign({}, state, {
			data1: "b"
		});
	}
	return state;
}
let store = createStore(combineReducers({
	reducer,
	reducer2
}));
store.subscribe(() => {
	let state = store.getState();
	console.log(state);
})
$(() => {
			var app = (
				<Provider store={store}>
					<App/>
				</Provider>
			)
			ReactDom.render( app, document.querySelector("#app"));
			})

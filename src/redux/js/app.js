import React from 'react';
import ReactDom from 'react-dom';
import Redux from 'redux';
import {
	Provider,
	connect
} from 'react-redux';
import $ from 'jquery';
import App from './App';
$(() => {
			ReactDom.render( < App > < /App>, document.querySelector("#app"));
			})

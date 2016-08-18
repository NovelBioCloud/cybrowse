import React, {
	Component
} from 'react';
import {
	render
} from 'react-dom';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Browse from './core';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

$(() => {
	render( < Browse / > ,
		document.getElementById('app')
	);
});

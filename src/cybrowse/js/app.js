import React, {
	Component
} from 'react';
import {
	render
} from 'react-dom';
import $ from 'jquery';
import Browse from './Browse';
const App = () => ( < Browse / > );
$(() => {
	render( < App / > ,
		document.getElementById('browse')
	);
});

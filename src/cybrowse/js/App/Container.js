import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import async from 'async';
import assert from 'assert';
import StoreUtil from './StoreUtil';
import {
	connect,
	Provider
} from 'react-redux';

export default class Container extends Component {
	constructor(props, context) {
		super(props);
    console.log(context);
	}
	render() {
		return <div > 123 < /div>
	}
}
Container.contextTypes = {
  store: React.PropTypes.object
}

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



class App extends React.Component {
constructor(props, context) {
	super(props, context)
}
render() {
		console.log(this.props);
		return ( < div >
				< button onClick = {
					() => {
						this.props.event1({
							type: "1"
						});
					}
				} > 1 < /button>  < button onClick = {
				() => {
					this.props.event1({
						type: "2"
					});
				}
			} > 2 < /button> < button onClick = {
			() => {
				this.props.event1({
					type: "a"
				});
			}
	} > a < /button> < button onClick = {
	() => {
		this.props.event2({
			type: "b"
		});
	}
} > b < /button> < /div >
)
}
}

function mapStateToProps(state) {
	return {
		reducer: state.reducer
	};
}

function event1(data) {
	return {
		type: "a",
		eventData: data,
	}
}

function event2(data) {
	return {
		type: "b",
		eventData: data,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		event1: bindActionCreators(event1, dispatch),
		event2: bindActionCreators(event2, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import _ from 'lodash'
import $ from 'jquery'
import toastr from 'toastr'

function thunk(obj) {
	return function () {
		return obj
	}
}

function thunkProps(obj) {
	if (!obj || !_.isObject(obj)) {
		throw new Error("obj must be a object")
	} else {
		let _obj = {}
		Object.keys(obj).forEach((key) => {
			_obj[key] = thunk(obj[key])
		})
		return _obj
	}
}
_.thunk = thunk
_.thunkProps = thunkProps

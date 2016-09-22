import _ from 'lodash'

function lazyObj(obj) {
	return () => {
		return obj
	}
}

function lazyProp(obj) {
	if (!_.isObjectLike(obj)) {
		throw new Error("obj must be a object")
	} else {
		let _obj = {}
		Object.keys(obj).forEach((key) => {
			_obj[key] = lazyObj(obj[key])
		})
		return _obj
	}
}
_.prototype.$lazyObj = lazyObj
_.prototype.$lazyProp = lazyProp

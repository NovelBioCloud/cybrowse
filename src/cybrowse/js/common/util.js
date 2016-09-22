import _ from 'lodash'
if (!_.propotype.$lazy) {
	function lazy(obj, lazyProp = false) {
		if (!lazyProp) {
			return () => {
				return obj
			}
		} else {
			if (_.isPlainObject(obj)) {
				throw new Error("obj can not be a plain object")
			}
			let _obj = {}
			Object.keys(obj).forEach((key) => {
				_obj[key] = lazy(obj[key])
			})
			return _obj
		}
	}
	_.propotype.$lazyProp = (obj) => {
		return lazy(obj, true)
	}
	_.propotype.$lazyObj = (obj) => {
		return lazy(obj)
	}
}

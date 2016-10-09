
export default function Milestone() {
	let _milestones = new Map()
	let _milestoneResolves = new Map()
	let _milestoneRejects = new Map()
	this.after = after
	this.resolve = resolve
	this.reject = reject
	this.prepare = prepare
	this.remove = remove

	function after(milestone, cb) {
		prepare(milestone)
		_milestones.get(milestone).then((...rest) => {
			cb(...rest)
		})
	}

	function resolve(milestone, cb, ...rest) {
		prepare(milestone)
		_milestoneResolves.get(milestone)(...rest)
	}

	function reject(milestone, cb, ...rest) {
		prepare(milestone)
		_milestoneRejects.get(milestone)(...rest)
	}

	function prepare(milestone) {
		if (!_milestones.has(milestone)) {
			_milestones.set(milestone, new Promise((resolve, reject) => {
				_milestoneResolves.set(milestone, resolve)
				_milestoneRejects.set(milestone, reject)
			}))
		}
	}

	function remove(milestone) {
		_milestones['delete'](milestone)
		_milestoneResolves['delete'](milestone)
		_milestoneRejects['delete'](milestone)
	}
}

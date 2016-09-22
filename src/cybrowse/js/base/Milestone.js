
export default class Milestone {
	_milestones = new Map()
	_milestoneResolves = new Map()
	_milestoneRejects = new Map()
	after(milestone, cb) {
		this.prepare(milestone)
		this._milestones.get(milestone).then((...rest) => {
			cb(...rest)
		})
	}
	resolve(milestone, cb, ...rest) {
		this.prepare(milestone)
		this._milestoneResolves.get(milestone)(...rest)
	}
	reject(milestone, cb, ...rest) {
		this.prepare(milestone)
		this._milestoneRejects.get(milestone)(...rest)
	}
	prepare(milestone) {
		if (!this._milestones.has(milestone)) {
			this._milestones.set(milestone, new Promise(resolve, reject) {
				this._milestoneResolves.set(milestone, resolve)
				this._milestoneRejects.set(milestone, reject)
			})
		}
	}
	remove(milestone) {
		this._milestones['delete'](milestone)
		this._milestoneResolves['delete'](milestone)
		this._milestoneRejects['delete'](milestone)
	}


}

import _ from 'lodash';
import assert from 'assert';
import Ready from 'ready-signal';

export default class Milestone {

	constructor(props) {
		this.milestones = [...arguments];
		this.readys = new Map();
		this.milestones.forEach((ms) => {
			this.readys.set(ms, new Ready());
		});
	}

	has(name) {
		return _.includes(this.milestones, name);
	}

	getReady(name) {
		assert(this.has(name));
		return this.readys.get(name);
	}

	finish(name) {
		this.getReady(name).signal();
	}

	after(name, action) {
		this.getReady(name)(() => {
			action();
		});
	}

}

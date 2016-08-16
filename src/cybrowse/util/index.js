import {
	EventEmitter
} from 'fbemitter';
let globalEmitter = new EventEmitter();
let util = {
	assign: Object.assign,
	emitter: globalEmitter,
	getEmitter: () => {
		return new EventEmitter();
	}
};
export default util;

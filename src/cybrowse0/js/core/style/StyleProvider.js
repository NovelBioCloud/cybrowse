export default class StyleProvider {
	constructor(selector, defaultStyle, value) {
		this.selector = selector;
		this.style = Object.assign({}, defaultStyle);
		this.value = value;
	}
	getStyle() {
		return this.style;
	}
	getSelector() {
		return this.selector;
	}
	update(style) {
		this.style = Object.assign({}, this.style, style);
	}
}

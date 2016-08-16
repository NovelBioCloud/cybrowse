let styles = new Map();
class StyleFactory {
	constructor(props) {
		this.styles = new Map();
		this.register(new DefaultStyle());
	}
	getStyle(styleName) {
		let isContains = this.styles.has(styleName);
		if (isContains) {
			return this.styles.get(styleName);
		} else {
			return null;
		}
	}
	register(style) {
		if (style.name) {
			throw new Error("name can not be null");
		}
		if (this.styles.has(styles.getName())) {
			throw new Error("style name should be unique")
		} else {
			this.styles.set(style.getName(), style);
		}
	}
}
export class DefaultStyle {
	constructor(name = 'default') {
		this.name = name;
	}
	getValue() {
		return {

		};
	}
}
let styleFactory = new StyleFactory();
export default styleFactory;

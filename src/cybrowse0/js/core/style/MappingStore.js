export default class MappingStore {
	constructor(cytoscapeMgr) {
		this.cytoscapeMgr = cytoscapeMgr;
		this.column = "";
		this.type = "";
		this.styleProviderMap = new Map();
	}
	setColumn(column) {
		let oldColumn = this.column;
		let oldType = this.type;
		this.column = column;
		this.updateStyleProviderMap(oldColumn, oldType);
	}
	setType(type) {
		let oldColumn = this.column;
		let oldType = this.type;
		this.type = type;
		this.updateStyleProviderMap(oldColumn, oldType);
	}
	setStyleProviderFactory(factory) {
		this.factory = factory;
	}
	updateStyleProviderMap(oldColumn, oldType) {
		if (oldColumn == this.column && oldType == this.type) {
			return;
		} else {
			this.styleProviderMap.clear();
			if (this.type == "discrete") {
				let values = this.cytoscapeMgr.getColumnValues(this.column);
				values.forEach((value) => {
					if (this.factory) {
						let provider = this.factory(value);
						this.styleProviderMap.set(value, provider);
					}
				});
			}
		}
	}
	getColumn() {
		return this.column;
	}
	getType() {
		return this.type;
	}
	updateStyleProviderMap2() {
		this.styleProviderMap.clear();
		if (this.type == "discrete") {
			let values = this.cytoscapeMgr.getColumnValues(this.column);
			values.forEach((value) => {
				if (this.factory) {
					let provider = this.factory(value);
					this.styleProviderMap.set(value, provider);
				}
			});
		}
	}
	getStyleProviderMap() {
		return this.styleProviderMap;
	}
	getColumns() {
		return this.cytoscapeMgr.getColumns();
	}
	getTypes() {
		return ["discrete", "passthrough"];
	}
	getColumnValues() {
		return this.cytoscapeMgr.getColumnValues(this.column);
	}
}

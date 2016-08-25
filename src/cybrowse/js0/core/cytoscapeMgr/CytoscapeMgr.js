import React from 'react';
import {
	EventEmitter
} from 'events';
import Provider from '../cytoscape-util';
import _ from 'lodash';
import {
	defaultConfig,
	layoutOptions,
	styleOptions
} from '../../etc';
import {
	nodeStyleProvider,
	edgeStyleProvider
} from '../../proc/style';
import {
	MappingStore
} from '../style';

export default class CytoscapeMgr {
	constructor(container) {
		this.provider = new Provider(container, defaultConfig, styleOptions);
		this.cy = this.provider.getCytoscape();
		this.eventEmitter = new EventEmitter();
	}
	getMappingStoreMap() {
		return this.mappingStoreMap = this.mappingStoreMap || new Map();
	}
	getMappingStore(type) {
		return this.getMappingStoreMap().get(type);
	}
	getCytoscape() {
		return this.provider.getCytoscape();
	}
	getProvider() {
		return this.provider;
	}
	getConfig() {
		return {};
	}
	reloadData(data) {
		this.eventEmitter.emit(CytoscapeMgr.onReloadData, data);
		this.cy.remove(this.cy.elements());
		this.cy.add(data);
	}
	getEventEvitter() {
		return this.eventEvitter;
	}
	getNodeStyleProvider() {
		return nodeStyleProvider;
	}
	getEdgeStyleProvider() {
		return edgeStyleProvider;
	}
	getColumns() {
		let datas = this.getNodeData();
		let keys = datas.map(data => _.keys(data));
		return _.union(...keys);
	}
	getNodeData() {
		return this.cy.nodes().map(ele => ele.data());
	}
	getColumnValues(field) {
		let columnValues = [];
		if (!field) {
			return columnValues;
		}
		this.getNodeData().forEach((data) => {
			let value = data[field];
			if (value && value !== "") {
				columnValues.push(value);
			}
		});
		return columnValues;
	}
}
CytoscapeMgr.onReloadData = 'onReloadData';

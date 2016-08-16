var Builder = require('./builder');
var path = require('path');
var _ = require('lodash');
var configs = require('../config/configs');
var gulp = require('gulp');

function BuilderWrap() {

	this.cleanAll = function () {
		_.each(configs, function (config) {
			var builder = new Builder({
				dev: false,
				moduleName: config.name,
				config: require(path.join(process.cwd(), config.path).replace(
					'.js', '')),
			});
			builder.clean();
			console.log('finish clean: ' + config.name);
		});
	};
	this.cleanOne = function (moduleName) {
		var find = false;
		_.each(configs, function (config) {
			if (config.name === moduleName) {
				var builder = new Builder({
					dev: false,
					moduleName: config.name,
					config: require(path.join(process.cwd(), config.path)
						.replace('.js', '')),
				});
				builder.clean();
				find = true;
			}
		});
		if (!find) {
			console.log('error: can not find the module ' + moduleName);
		}
		console.log('finish clean: ' + moduleName);
	}
	this.buildAll = function () {
		console.log('start buildAll: ');
		_.each(configs, function (config) {
			console.log('-- start build: ' + config.name);
			var builder = new Builder({
				dev: false,
				moduleName: config.name,
				config: require(path.join(process.cwd(), config.path).replace(
					'.js', '')),
			});
			builder.clean();
			builder.copyFile();
			builder.buildLess();
			builder.buildEs5();
			builder.buildEs6();
			console.log('-- finish build: ' + config.name);
		});
		console.log('finish buildAll');
	};
	this.buildOne = function (moduleName, dev) {
		console.log('start build: ' + moduleName);
		var find = false;
		_.each(configs, function (config) {
			if (config.name === moduleName) {
				find = true;
				var builder = new Builder({
					dev: !!dev,
					moduleName: config.name,
					config: require(path.join(process.cwd(), config.path)
						.replace('.js', '')),
				});
				builder.clean();
				builder.copyFile();
				builder.buildLess();
				builder.buildEs5();
				builder.buildEs6();
			}
		});
		if (!find) {
			console.log('error: can not find the module ' + moduleName);
		}
		console.log('finish build: ' + moduleName);
	}

	this.autoBuild = function (moduleName) {

		console.log('start autobuild: ' + moduleName);
		var find = false;
		_.each(configs, function (config) {
			if (config.name === moduleName) {
				find = true;
				var moduleConfig = require(path
					.join(process.cwd(), config.path).replace('.js', ''));
				var builder = new Builder({
					dev: true,
					moduleName: config.name,
					config: moduleConfig,
				});

				function buildImpl() {
					builder.copyFile();
					builder.buildLess();
					builder.buildEs5();
					builder.buildEs6();
				}
				buildImpl();
				gulp.watch(moduleConfig.watchSrc || 'webapp-src/**',
					buildImpl);

			}
		});
		if (!find) {
			console.log('error: can not find the module ' + moduleName);
		}
	};
};

module.exports = BuilderWrap;

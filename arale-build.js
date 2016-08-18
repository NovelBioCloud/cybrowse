#!/usr/bin/env node
var BuilderWrap = require('./build/base/builderWrap');
var builderWrap = new BuilderWrap();
var action = process.argv[2];
var module = process.argv[3];
console.log(process.cwd());
if (!action || !module) {
	printHelp();
	return;
}
if (action === 'clean') {
	if (module === 'all') {
		builderWrap.cleanAll();
	} else {
		builderWrap.cleanOne(module);
	}
} else if (action === 'release') {
	process.env.NODE_ENV = 'production';
	if (module === 'all') {
		builderWrap.buildAll();
	} else {
		builderWrap.buildOne(module);
	}
} else if (action === 'build') {
	if (module === 'all') {
		console.log('没有该功能');
	} else {
		builderWrap.autoBuild(module);
	}
} else {
	console.log('没有该功能');
	printHelp();
}
function printHelp() {
	console.log('----------------------------------------');
	console.log('	帮助：	help	');
	console.log('	清理：	clean (all | $modulename)');
	console.log('	开发构建：	build $modulename');
	console.log('	发布：	release (all | $modulename)');
	console.log('----------------------------------------');
}

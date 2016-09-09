module.exports = {
	watchSrc: 'src/redux/**',
	clear: ['dist/redux'],
	copy: [{
		source: 'src/redux/html/*.html',
		target: 'dist/redux/',
	}],
	less: [{
		source: 'src/redux/less/app.less',
		target: 'dist/redux/',
	}],
	es6: [{
		source: 'src/redux/js/app.js',
		target: 'dist/redux/',
		name: 'app.js'
	}]
}

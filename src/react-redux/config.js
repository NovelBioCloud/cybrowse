module.exports = {
	watchSrc: 'src/react-redux/**',
	clear: ['dist/react-redux'],
	copy: [{
		source: 'src/react-redux/html/*.html',
		target: 'dist/react-redux/',
	}],
	less: [{
		source: 'src/react-redux/less/app.less',
		target: 'dist/react-redux/',
	}],
	es6: [{
		source: 'src/react-redux/js/app.js',
		target: 'dist/react-redux/',
		name: 'app.js'
	}]
}

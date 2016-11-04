module.exports = {
	watchSrc: 'src/server/**',
	clear: ['dist/server/**'],
	copy: [{
		source: 'src/server/html/index.html',
		target: 'dist/',
	}],
	es6: [
	]
}

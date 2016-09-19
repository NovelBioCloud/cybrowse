module.exports = {
	watchSrc: 'src/lib/**',
	clear: ['dist/lib'],
	copy: [{
		source: 'src/lib/**',
		target: 'dist/lib/',
	}],
}

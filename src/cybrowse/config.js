module.exports = {
	watchSrc: 'src/cybrowse/**',
	clear: ['dist/cybrowse'],
	copy: [{
		source: 'src/cybrowse/html/*.html',
		target: 'dist/cybrowse/',
	}, {
		source: 'src/cybrowse/data/*.json',
		target: 'dist/cybrowse/data/',
	}],
	less: [{
		source: 'src/cybrowse/less/app.less',
		target: 'dist/cybrowse/',
	}],
	es6: [
		{
			source: 'src/cybrowse/js/app.js',
			target: 'dist/cybrowse/',
			name: 'app.js'
	}]
}

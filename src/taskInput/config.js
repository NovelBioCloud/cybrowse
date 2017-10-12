module.exports = {
		watchSrc: 'src/taskInput/**',
		clear: ['dist/taskInput'],
		copy: [
				{
						source: 'src/taskInput/html/**',
						target: 'dist/taskInput/html/'
				}
		],
		less: [
				{
						source: 'src/taskInput/less/app.less',
						target: 'dist/taskInput/css/'
				}
		],
		es6: [
				// {
				// 		source: 'src/taskInput/js/app.js',
				// 		target: 'dist/taskInput/js/',
				// 		name: 'app.js'
				// }
		],
		ts: [
				// {
				// 		source: 'src/taskInput/ts/app.ts',
				// 		target: 'dist/taskInput/js/',
				// 		name: 'app.js'
				// }
		]
}

"use strict";

module.exports = function() {
	return ({
		ignore: [
			'/public/.*'
		],
		dependencies: {},
		route: [
			'config/build.js',
			'config/client.js',
			'config/cdn.js'
		],
		cdn: [
			{
				path: '/semantic/',
				priority: 3,
				source: 'public/semantic'
			}
		],
		import: [
			{
				module: 'generic',
				as: 'webapp',
				path: '/entity/webapp.js'
			},
			{
				module: 'generic',
				as: 'placeholder',
				path: '/entity/placeholder.js'
			}
		]
	});
};

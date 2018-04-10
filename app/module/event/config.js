"use strict";

module.exports = function() {
	return ({
		dependencies: {},
		route: [
			'/config/api.js'
		],
		import: [
			{
				module: 'generic',
				as: 'db',
				path: '/entity/util/db.js'
			},
			{
				module: 'socket',
				as: 'node',
				path: '/entity/node.js'
			}
		]
	});
};

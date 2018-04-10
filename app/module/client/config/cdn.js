"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/client/:path',
			priority: 2,
			param: {
				path: '.*'
			},
			action: {
				controller: 'client',
				method: 'cdn'
			}
		}
	]);
};

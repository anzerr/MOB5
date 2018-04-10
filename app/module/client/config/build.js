"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/build',
			action: {
				controller: 'build',
				method: 'create'
			}
		}
	]);
};

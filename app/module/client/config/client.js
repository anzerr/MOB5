"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/client',
			priority: 3,
			action: {
				controller: 'client',
				method: 'index'
			}
		},
		{
			method: ['get'],
			path: '/client/json',
			priority: 3,
			action: {
				controller: 'client',
				method: 'json'
			}
		},
		{
			method: ['get'],
			path: '/favicon.png',
			priority: 3,
			action: {
				controller: 'client',
				method: 'fav'
			}
		},
		{
			method: ['get'],
			path: '/favicon.ico',
			priority: 4,
			action: {
				controller: 'client',
				method: 'fav'
			}
		}
	]);
};

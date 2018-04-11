"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/event/:shard',
			param: {
				shard: '[a-z0-9]*'
			},
			action: {
				controller: 'event',
				method: 'get'
			}
		},
		{
			method: ['post'],
			path: '/event/:shard',
			param: {
				shard: '[a-z0-9]*'
			},
			action: {
				controller: 'event',
				method: 'create'
			}
		},
		{
			method: ['put'],
			path: '/event/:shard',
			param: {
				shard: '[a-z0-9]*'
			},
			action: {
				controller: 'event',
				method: 'update'
			}
		},
		{
			method: ['delete'],
			path: '/event/:shard',
			param: {
				shard: '[a-z0-9]*'
			},
			action: {
				controller: 'event',
				method: 'remove'
			}
		},
	]);
};

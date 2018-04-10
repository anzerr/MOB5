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
			path: '/event/:shard/free',
			param: {
				shard: '[a-z0-9]*'
			},
			action: {
				controller: 'event',
				method: 'free'
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
				method: 'reserve'
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
				method: 'reserve'
			}
		}
	]);
};

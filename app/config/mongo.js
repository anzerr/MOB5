"use strict";

module.exports = function(config) {
	return ({
		collection: {},
		connection: {
			default: 'mongodb://localhost:27017/default?authSource=admin'
		},
		config: {}
	});
};

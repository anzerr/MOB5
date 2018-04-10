"use strict";

$.require([
	'bootstrap!/part/info.js',
	'bootstrap!/part/response.js',
	'bootstrap!/part/scope.js',
	'bootstrap!/part/mongo.js'
], function(
	info,
	response,
	scope,
	mongo
) {

	module.exports = {
		info: info,
		response: response,
		scope: scope,
		mongo: mongo
	}
});

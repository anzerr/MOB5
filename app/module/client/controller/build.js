"use strict";

module.exports = function($) {
	return $.require([
		//
	], function(
		//
	) {

		var obj = function() {};
		obj.prototype = $.extends('!controller', {
			create: function() {
				// build into app
			}
		});

		return ({'static private': obj});
	});
};

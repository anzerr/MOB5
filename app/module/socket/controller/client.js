"use strict";

module.exports = function($) {
	return $.require([
		'module!entity/handle.js',
		'module!entity/node.js',
	], function(
		handle,
		node
	) {

		var obj = function() {
			this._name = {};
		};
		obj.prototype = $.extends('!controller', {
			subscribe: function(data) {
				if ($.is.string(data.body.user) && $.is.string(data.body.shard)) {
					this._name[data.socket.id()] = data.body.user;
					handle.subscribe(data.socket, data.body.shard);
				}
			},

			unsubscribe: function(data) {
				if ($.is.string(data.body.shard)) {
					handle.unsubscribe(data.socket, data.body.shard);
				}
			}
		});

		return ({'static private': obj});
	});
};

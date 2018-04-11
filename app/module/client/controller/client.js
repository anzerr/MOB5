"use strict";

module.exports = function($) {
	return $.require([
		'import!webapp',
		'import!placeholder'
	], function(
		webapp,
		placeholder
	) {

		var obj = function() {
			this._priority = {
				'/util/util.js': 7
			};
		};
		obj.prototype = $.extends('!controller', {
			index: function() {
				return (webapp.main({
					header: ['<title>Chat</title>'],
					main: '/client/main.js'
				}));
			},

			json: function(data) {
				const self = this;
				return (webapp.files($.path('module!/public/client/module'), '/client/module', this._priority).then(function(files) {
					return self.res().status(200).data(files);
				}));
			},

			cdn: function(data) {
				var url = ('/' + data.url).replace(/\/{2,}/g, '/');
				if (url.match(/^(\/[a-z]+)+\.js$/)) {
					return (this.file({contentDisposition: 'inline', path: $.path('module!/public/' + data.url)}));
				}
				return (this.res().status(500).data('F101'));
			},

			fav: function() {
				const self = this;
				return (placeholder.get('64x64').then(function(path) {
					return (self.file({contentDisposition: 'inline', path: $.path(path)}));
				}, function() {
					return (self.res().status(404).data({error: 'error creating placeholder image'}));
				}));
			}
		});

		return ({'static private': obj});
	});
};

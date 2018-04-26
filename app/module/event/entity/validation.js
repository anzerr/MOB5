"use strict";

module.exports = function($) {
    return $.require([
        //
    ], function(
        //
    ) {

        const m = {
            s: function(a) {
                return $.is.string(a);
            },
            n: function(a) {
                return $.is.int(a);
            }
        }

        var obj = function() {};
        obj.prototype = $.extends('!controller', {
            shard: function(data) {
                if (m.s(data.body.user)) {
                    return (true);
                }
                return $.promise().reject(this.res().status(400).data('R301'));
            },

            get: function(data) {
                if (m.s(data.body.shard)) {
                    return (true);
                }
                return $.promise().reject(this.res().status(400).data('R301'));
            },

            create: function(data) {
                let b = data.body;
                if (m.s(b.shard) && m.s(b.user) && m.s(b.name) && m.s(b.description) && m.n(b.start) && m.n(b.end)) {
                    return (true);
                }
                return $.promise().reject(this.res().status(400).data('R302'));
            },

            remove: function(data) {
                let b = data.body;
                if (m.s(b.shard) && m.s(data.body.id)) {
                    return (true);
                }
                return $.promise().reject(this.res().status(400).data('R301'));
            },

            update: function(data) {
                let b = data.body;
                if (m.s(b.shard) && m.s(data.body.id) && $.is.object(data.body.event)) {
                    return (true);
                }
                return $.promise().reject(this.res().status(400).data('R301'));
            }
        });

        return ({'static private': obj});
    });
};

"use strict";

module.exports = function($) {
    return $.require([
        'import!socket',
    ], function(
        base
    ) {

        var obj = function() {
            this._socket = {};
        };
        obj.prototype = $.extends(base, {
            send: function(event, data, shard) {
                return this._send(data, event, shard);
            }
        });

        return ({'static private': obj});
    });
};

"use strict";

module.exports = function($) {
    return $.require([
        'import!db',
        'module!/entity/model.js'
    ], function(
        db,
        model
    ) {

        var obj = function() {};
        obj.prototype = {
            db: new db({service: $.service('mongo'), prefix: 'shard_'}),

            shard: function(user) {
                return (this.db.find('shard', {user: user}).then(function(res) {
                    return (res);
                }));
            },

            /**
             * Get all reservations for a shard
             *
             * @param shard
             * @returns {*|obj|Promise.<TResult>}
             */
            get: function(shard) {
                return (this.db.find('event', {shard: shard}).then(function(res) {
                    return (res);
                }));
            },

            /**
             * Create a reservation
             *
             * @param data
             * @returns {*}
             */
            create: function(data) {
                var d = model.create().set(data).get();
                d._id = $.key.long();
                this.db.insert('shard', {_id: d.shard, user: d.user});
                return this.db.insert('event', d);
            },

            /**
             * remove event
             *
             * @param  {[type]} data [description]
             * @return {[type]}      [description]
             */
            remove: function(id) {
                return (this.db.remove('event', {_id: id}));
            },

            /**
             * update a event
             *
             * @param  {[type]} data [description]
             * @return {[type]}      [description]
             */
            update: function(id, data) {
                var d = model.create().set(data).get();
                return (this.db.update('event', {_id: id}, d));
            },
        };

        return ({'static private': obj});
    });
};

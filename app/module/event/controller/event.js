"use strict";

module.exports = function($) {
    return $.require([
        'module!entity/action.js',
        'module!entity/validation.js',
        'import!node'
    ], function(
        event,
        validation,
        node
    ) {

        var obj = function() {};
        obj.prototype = $.extends('!controller', {
            send: function(type, data, shard) {
                node.send({
                    user: 'system',
                    time: $.time.now().get,
                    message: {type: type, data: data}
                }, shard);
            },

            shard: $.midware([validation, 'get'], function(data) {
                return event.shard(data.body.user).then((res) => {
                    return this.res().status(200).data(res);
                }, (res) => {
                    return this.res().status(400).data(res);
                });
            }),

            get: $.midware([validation, 'get'], function(data) {
                return event.get(data.body.shard || 'none').then((res) => {
                    return this.res().status(200).data(res);
                }, (res) => {
                    return this.res().status(400).data(res);
                });
            }),

            create: $.midware([validation, 'create'], function(data) {
                return event.create(data.body).then((res) => {
                    this.send('create', {in: data.body, out: res}, data.body.shard || 'none');
                    return this.res().status(200).data(res);
                }, (res) => {
                    return this.res().status(400).data(res);
                });
            }),

            remove: $.midware([validation, 'remove'], function(data) {
                return event.remove(data.body.id).then((res) => {
                    this.send('remove', {in: data.body, out: res}, data.body.shard || 'none');
                    return this.res().status(200).data(res);
                }, (res) => {
                    return this.res().status(400).data(res);
                });
            }),

            update: $.midware([validation, 'update'], function(data) {
                return event.update(data.body.id, data.body.event).then(function(res) {
                    this.send('update', {in: data.body, out: res}, data.body.shard || 'none');
                    return this.res().status(200).data(res);
                }, (res) => {
                    return this.res().status(400).data(res);
                });
            })
        });

        return ({'static private': obj});
    });
};

"use strict";

module.exports = function($) {
    return $.require([
        //
    ], function(
        //
    ) {

        return ({'private': $.model(function(m) {
            m.init({
                user: m.type('string').default(''),
                shard: m.type('string').default(''),
                start: m.type('int').default(0),
                end: m.type('int').default(0),
                name: m.type('string').default(''),
                description: m.type('string').default('')
            });
        })});
    });
};

"use strict";

$.require([
    //
], function(
    //
) {
    var format = function(s) {
        return (s.charAt(0).toUpperCase() + s.slice(1));
    };

    var view = function(url) {
        return ('mongodb://' + (url.replace(/mongodb:\/\//, '').replace(/:.*@/, ':~password~@')));
    };

    module.exports = function(mongo, s, time) {
        var skip = s || {};
        var wait = [], list = $.config.get('mongo.connection'), key = [], done = {};
        console.log(list);
        for (var i in list) {
            key.push(i);
            (function(i) {
                console.log('mongo url', i, view(list[i]));
                var p = new $.promise(), timeout = null;
                if (skip[i]) {
                    timeout = setTimeout(function() {
                        if (!done[i]) {
                            done[i] = true;
                            console.log('timeout', i);
                            p.resolve(null);
                        }
                    }, $.time.second(10).get);
                }

                mongo.connect(i).then(function(res) {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    if (!done[i]) {
                        done[i] = true;
                        console.log('connect', i);
                        p.resolve(res);
                    }
                }, function(err) {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    console.log('reject', i, err);
                    if (skip[i]) {
                        if (!done[i]) {
                            done[i] = true;
                            p.resolve(null);
                        }
                    }
                });

                wait.push(p);
            })(i);
        }

        var timeout = null;
        if (time != false) {
            timeout = setTimeout(function() {
                console.log('mongo dump', key, done, list);
                throw new Error('failed to connect to mongodb');
            }, time || $.time.second(30).get);
        }

        return ($.all(wait).then(function(res) {
            if (timeout) {
                clearTimeout(timeout);
            }

            var out = {};
            for (var i in res) {
                out['mongo' + format(key[i])] = res[i];
                if (key[i] == 'default') {
                    out.mongo = res[i];
                }
            }
            return (out);
        }));
    };
});

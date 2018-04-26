var _App;
(function($) {
    "use strict";

    if (!$.app) {
        $.app = {};
    }

    var util = {
        script: function(file, cd) {
            var script = document.createElement('script');
            script.src = file;
            script.onload = function() {
                setTimeout(function() {
                    cd();
                }, 1000 / 30);
            };
            document.head.appendChild(script);
        },
        loader: function() {
            var e = document.getElementById('loader');
            e.style.opacity = 0;
            e.style.pointerEvents = 'none';
            setTimeout(function() {
                e.parentElement.removeChild(e);
            }, 5000);
        },
        request: function(url, method) {
            return {
                url: url,
                method: method || 'GET',
                headers: {Authorization: ($.app.login || {}).session}
            };
        },
        style: function(name, type) {
            var deus = new $._deus(name), r = deus.pub();
            $.util.style(type, r);
        },
        load: function() {
            var self = this;
            return $.ajax(this.request('/client/json')).then(function(msg) {
                var wait = [];
                for (var i in msg) {
                    wait.push($.ajax(self.request(msg[i])).then(function(data) {
                        var script = document.createElement('script');
                        script.innerHTML = data;
                        document.head.appendChild(script);
                        return true;
                    }));
                }
                return ($.all(wait));
            });
        }
    };

    var main = function() {
        var deus = ['part', 'shared', 'service'];
        for (var i in deus) {
            util.style(deus[i], 'base');
        }

        $.require([
            '/semantic/overload.css',
            '/semantic/semantic.min.css',
            '/semantic/semantic.min.js'
        ]).then(function() {
            return util.load();
        }).then(function() {
            $.route.add({
                path: '/',
                action: {
                    controller: 'service',
                    method: 'index'
                }
            });

            $.url = 'http://137.74.169.129:650';

            window.addEventListener('hashchange', function(res) {
                $.route.run(res.newURL);
            });

            setTimeout(function() {
                util.loader();
                $.route.run(window.location.href);
            }, 200);
        })
    };

    window.addEventListener('load', function() {
        util.script('/lib.raw', function() {
            util.script('/react.raw', function() {
                main();
            });
        });
    });

})(_App || (_App = {}));

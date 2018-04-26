var _App;
(function($) {
    "use strict";

    if (!$.app) {
        $.app = {};
    }

    var util = {
        loader: function() {
            var e = document.getElementById('loader');
            e.style.opacity = 0;
            e.style.pointerEvents = 'none';
            setTimeout(function() {
                e.parentElement.removeChild(e);
            }, 5000);
        },
        style: function(name, type) {
            var deus = new $._deus(name), r = deus.pub();
            $.util.style(type, r);
        }
    };

    var deus = ['part', 'shared', 'service'];
    for (var i in deus) {
        util.style(deus[i], 'base');
    }

    $.util = {
        request: function(path, method, data) {
            var formBody = [];
            for (var i in data) {
                var encodedKey = encodeURIComponent(i);
                var encodedValue = encodeURIComponent(data[i]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            var a = {
                url: path,
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data: formBody
            };
            console.log(a);
            return a;
        }
    }

    window.addEventListener('load', function() {
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
    });

})(_App || (_App = {}));

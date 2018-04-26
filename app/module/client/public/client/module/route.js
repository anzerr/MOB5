var _App;
(function($) {
    "use strict";

    $.route.add({
        path: '/login',
        action: {
            controller: 'service',
            method: 'login'
        }
    }).add({
        path: '/calendar',
        action: {
            controller: 'service',
            method: 'calendar'
        }
    });

})(_App || (_App = {}));

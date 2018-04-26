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
        path: '/role',
        action: {
            controller: 'service',
            method: 'role'
        }
    }).add({
        path: '/user',
        action: {
            controller: 'service',
            method: 'user'
        }
    });

})(_App || (_App = {}));

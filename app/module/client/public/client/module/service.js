var _App;
(function($) {
    "use strict";

    var info = {
        page: 'service'
    };
    var deus = new $._deus(info.page), r = deus.pub();

    var macro = function(a) {
        return ReactDOM.render(r('div').style('full').c(
            r('div').style('abs', {width: '0px', right: '0px', height: 'calc(100% - 20px)'}).c(
                r('part.info').c()
            ),
            r(a).c()
        ), document.getElementById('container'));
    }

    $.page.add('service', {
        index: function() {
            macro('service.index');
            return (true);
        },

        login: function() {
            macro('service.login');
            return (true);
        },

        calendar: function() {
            macro('service.calendar');
            return (true);
        }
    });
})(_App || (_App = {}));

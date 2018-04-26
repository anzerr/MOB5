var _App;
(function($) {
    "use strict";

    var deus = new $._deus('shared'), r = deus.pub();

    var base = $.react.create({
        render: function () {
            return (r('part.center').set({anim: true}).c(
                r('div').style({fontSize: '64px'}).c('404')
            ));
        }
    });

    var error = $.react.create({
        render: function () {
            return ($.react.get('div', {className: 'fullCenter'},
                'error'
            ));
        }
    });

    $.page.add('misc', {
        '404': function() {
            ReactDOM.render(r(base).c(), document.getElementById('container'));
            return (true);
        },
        error: function() {
            ReactDOM.render(r(error).c(), document.getElementById('container'));
            return (true);
        }
    });
})(_App || (_App = {}));

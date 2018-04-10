var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);

    r.create(info.page + '.form', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this;
            return r('div').style('abs', 'full', {top: '0px', left: '0px', background: 'rgba(255, 255, 255, 0.9)'}).c(
                'cat',
                r('div').on('click', function(res) {
                    if (self.props.onClose) {
                        self.props.onClose(res);
                    }
                    return res;
                }).c('close')
            );
        }
    });
})(_App || (_App = {}));

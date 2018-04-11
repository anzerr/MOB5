var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);


    r.create(info.page + '.edit', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this, data = {};
            for (var i in this.props.data) {
                data[i] = this.props.data[i];
            }
            return r('part.modal').set({size: 'full', show: true}).c(
                r('div').style({padding: '20px'}).c(
                    this.props.id,
                    r('div').class('button').on('click', function(res) {
                        if (self.props.onClose) {
                            self.props.onClose(true);
                        }
                        return res;
                    }).c('sumbit'),
                    r('div').class('button').on('click', function(res) {
                        if (self.props.onClose) {
                            self.props.onClose(false);
                        }
                        return res;
                    }).c('close')
                )
            );
        }
    });
})(_App || (_App = {}));

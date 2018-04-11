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

        part: function(key, data, type) {
            var self = this;
            return r('div').c(
                r('span').c(key),
                r('part.input').set({value: data[key] || ((type == 'date')? '' : ''), type: type}).on('change', function(res) {
                    data[key] = res;
                    console.log(res);
                    if (self.props.onChange) {
                        self.props.onChange(data);
                    }
                }).c()
            );
        },

        render: function() {
            var self = this, data = {};
            for (var i in this.props.data) {
                data[i] = this.props.data[i];
            }
            return r('part.modal').set({size: 'full', show: true}).c(
                r('div').style({padding: '20px'}).c(
                    this.part('name', data),
                    this.part('description', data),
                    this.part('start', data, 'date'),
                    this.part('end', data, 'date'),
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

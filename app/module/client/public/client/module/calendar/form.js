var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);

    var form = [
        {
            key: 'name',
            name: 'name',
            placeholder: 'name'
        },
        {
            key: 'description',
            name: 'description',
            placeholder: 'description'
        },
        {
            key: 'startDate',
            name: 'start date',
            type: 'date'
        },
        {
            key: 'startTime',
            name: 'start time',
            type: 'time'
        },
        {
            key: 'endDate',
            name: 'end date',
            type: 'date'
        },
        {
            key: 'endTime',
            name: 'end time',
            type: 'time'
        }
    ]

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
            var self = this;

            return r('part.modal.type').set({
                type: 'bool',
                show: this.props.show,
                size: 'full'
            }).on('click', function(type) {
                if (type == 'okay') {
                    if (self.props.onClose) {
                        self.props.onClose(true);
                    }
                } else {
                    if (self.props.onClose) {
                        self.props.onClose(false);
                    }
                }
                return type;
            }).c(
                r('div').style({height: '100%', padding: '20px'}).c(
                    r('part.form').set({value: self.props.data || {}, form: form}).on('change', function(e) {
                        if (self.props.onChange) {
                            self.props.onChange(e);
                        }
                    }).c()
                )
            );

            /*return r('part.modal').set({size: 'full', show: true}).c(
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
            );*/
        }
    });
})(_App || (_App = {}));

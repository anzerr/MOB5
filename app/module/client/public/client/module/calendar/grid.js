var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);
    var user = $.user;

    r.create(info.page + '.grid', {
        getInitialState: function() {
            return ({});
        },

        days: function() {
            var day = 24 * 60 * 60 * 1000, start = this.props.start, end = this.props.end;
            return Math.round(Math.abs((start.getTime() - end.getTime()) / day));
        },

        get: function(page, scroll) {
            var self = this;
            this.setState({load: true});
            $.ajax({
                url: '/event/' + this.props.shard,
                method: 'GET',
                data: {
                    user: user
                }
            }).then(function(msg) {
                console.log(msg);
                self.setState({load: false});
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        componentDidMount: function() {
            var self = this;
            setTimeout(function() {
                self.get();
            });
        },

        render: function() {
            var days = this.days(), line = [], row = [], size = 7;
            for (var i = 0; i < days; i++) {
                var l = line.length;
                if (row.length >= size) {
                    line.push(r('div').set({key: l + '.row'}).style({overflow: 'auto'}).c(row));
                    row = [];
                }
                row.push(r('div').style({height: '50px', width: (100 / size) + '%', float: 'left'}).set({key: l + '.' + row.length}).c(i + 1));
            }
            row.push(r('div').style({height: '50px', width: ((size - row.length) * (100 / size)) + '%', float: 'left'}).set({key: l + '.pad'}).c());
            line.push(r('div').set({key: line.length + '.row'}).style({overflow: 'auto'}).c(row));

            var self = this;
            return r('div').c(
                r('part.loader').set({show: this.state.load}).c(),
                r('socket').set({shard: this.props.shard}).on('change', function(res) {
                    console.log(res);
                }).c(),
                r('div').c(days + ' ' + this.props.shard),
                r('div').c(line),

                (this.state.type)? r(info.page + '.form').set({data: this.state.form}).on('change', function(res) {
                    self.setState({form: res});
                }).on('close', function() {
                    console.log('type');
                    self.setState({type: null, form: {}});
                }).c() : null,

                r('div').on('click', function() {
                    self.setState({type: 'add'});
                }).c('create'),
            );
        }
    });
})(_App || (_App = {}));

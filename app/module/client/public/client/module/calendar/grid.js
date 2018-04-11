var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);
    if (!localStorage.getItem('user')) {
        var user = 'nano_' + $.util.random(32);
        localStorage.setItem('user', user);
    } else {
        user = localStorage.getItem('user');
    }

    r.create(info.page + '.grid', {
        getInitialState: function() {
            return ({});
        },

        days: function() {
            var day = 24 * 60 * 60 * 1000, start = this.props.start, end = this.props.end;
            return Math.round(Math.abs((start.getTime() - end.getTime()) / day));
        },

        get: function() {
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
                self.setState({load: false, event: msg});
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        create: function(data) {
            var self = this;
            data.user = user;
            data.shard = this.props.shard;
            data.start = new Date(data.start).getTime();
            data.end = new Date(data.end).getTime();
            this.setState({load: true});
            $.ajax({
                url: '/event/' + this.props.shard,
                method: 'post',
                data: data
            }).then(function(msg) {
                self.setState({load: false});
                return self.get();
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

        row: function(day) {
            var date = new Date(this.props.start), next = new Date(this.props.start);
            date.setDate(day);
            next.setDate(day + 1);
            var d = function(date, a) { return (date >= a.start && date <= a.end); }, t = [{name: day}];
            for (var i in this.state.event) {
                var e = this.state.event[i];
                if (d(date.getTime(), e) || d(next.getTime(), e)) {
                    t.push(e);
                }
            }
            var out = [], w = (100 / t.length), self = this;
            for (var i in t) {
                (function(i) {
                    var tmp = r('div').set({key: i}).style('abs', {width: w + '%', top: '0px', left: (w * i) + '%'})
                    if (t[i]._id) {
                        tmp.on('click', function() {
                            self.setState({edit: t[i]._id});
                        })
                    }
                    out.push(tmp.c(t[i].name));
                })(i);
            }
            return out;
        },

        render: function() {
            var days = this.days(), line = [], row = [], size = 7;
            for (var i = 0; i < days; i++) {
                var l = line.length;
                if (row.length >= size) {
                    line.push(r('div').set({key: l + '.row'}).style({overflow: 'auto'}).c(row));
                    row = [];
                }
                row.push(r('div').style({height: '50px', width: (100 / size) + '%', float: 'left', position: 'relative'}).set({key: l + '.' + row.length}).c(this.row(i + 1)));
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
                    console.log(res);
                    self.setState({form: res});
                }).on('close', function(res) {
                    if (res) {
                        self.create(self.state.form);
                    }
                    self.setState({type: null, form: {}});
                }).c() : null,

                (this.state.edit)? r(info.page + '.edit').set({id: this.state.edit}).on('close', function(res) {
                    if (res) {
                        self.get();
                    }
                    self.setState({edit: null});
                }).c() : null,

                r('div').on('click', function() {
                    self.setState({type: 'add'});
                }).c('create'),
            );
        }
    });
})(_App || (_App = {}));

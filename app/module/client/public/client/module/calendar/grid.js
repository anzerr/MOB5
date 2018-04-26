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

    var s = {
        line: {overflow: 'auto', marginBottom: '10px', borderBottom: '3px solid #9494941a'},
        box: {height: '100px', width: (100 / 7) + '%', float: 'left', position: 'relative'},
        add: {
            margin: '20px',
            background: 'red',
            width: '70px',
            height: '70px',
            lineHeight: '70px',
            textAlign: 'center',
            borderRadius: '50%',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
        },
        active: {
            background: '#007eff',
            width: '25px',
            height: '25px',
            lineHeight: '25px',
            textAlign: 'center',
            borderRadius: '50%',
            color: 'white',
            fontWeight: 'bold',
        },
        event: {
            margin: '1px 30px',
            textAlign: 'center',
            background: 'red',
            borderRadius: '5px',
            color: 'white',
            overflow: 'hidden'
        }
    }

    var hashCode = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }, intToRGB = function(i){
        var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
    };

    r.create(info.page + '.grid', {
        getInitialState: function() {
            return ({load: true});
        },

        shouldComponentUpdate: function(nextProps, nextState) {
            if (nextProps.shard != this.props.shard) {
                if (!this.state.load) {
                    this.get(nextProps.shard);
                }
            }
            return true;
        },

        color: function(str) {
            return '#' + intToRGB(hashCode(str));
        },

        days: function() {
            var day = 24 * 60 * 60 * 1000, start = this.props.start, end = this.props.end;
            return Math.round(Math.abs((start.getTime() - end.getTime()) / day));
        },

        get: function(shard) {
            var self = this;
            this.setState({load: true});
            $.ajax({
                url: $.url + '/event/' + (shard || this.props.shard),
                method: 'GET',
                data: {
                    user: user
                }
            }).then(function(msg) {
                setTimeout(function() {
                    console.log(msg);
                    self.setState({load: false, event: msg});
                }, 400);
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        create: function(data) {
            var self = this, d = {
                user: user,
                shard: this.props.shard,
                name: data.name,
                description: data.description,
                start: new Date(data.startDate + ' ' + data.startTime).getTime(),
                end: new Date(data.endDate + ' ' + data.endTime).getTime()
            };
            console.log(data, d);
            this.setState({load: true});
            $.ajax({
                url: $.url + '/event/' + this.props.shard,
                method: 'post',
                data: d
            }).then(function(msg) {
                self.setState({load: false});
                return self.get();
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        update: function(data) {
            var self = this, d = {
                user: user,
                shard: this.props.shard,
                name: data.name,
                description: data.description,
                start: new Date(data.startDate + ' ' + data.startTime).getTime(),
                end: new Date(data.endDate + ' ' + data.endTime).getTime()
            };
            console.log(data, d);
            this.setState({load: true});
            $.ajax({
                url: $.url + '/event/' + this.props.shard,
                method: 'put',
                data: {
                    id: data.id,
                    event: d
                }
            }).then(function(msg) {
                return self.get();
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        remove: function(id) {
            var self = this;
            this.setState({load: true});
            $.ajax({
                url: $.url + '/event/' + this.props.shard,
                method: 'delete',
                data: {id: id}
            }).then(function(msg) {
                return self.get();
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        componentDidMount: function() {
            var self = this;
            setTimeout(function() {
                self.get();
            }, 100);
        },

        isBetween: function(day, a, type) {
            var date = new Date(this.props.start), next = new Date(this.props.start);
            date.setDate(day);
            next.setDate(day + 1);
            var d = {
                a: function(date) { return (a.start >= date && a.end <= next); },
                b: function(date) { return (date >= a.start && date <= a.end); }
            };
            return (d[type || 'b'](date.getTime()) || d[type || 'b'](next.getTime()));
        },

        row: function(day) {
            var t = [], now = new Date().getTime(), isToday = this.isBetween(day, {start: now, end: now + 1}, 'a');
            for (var i in this.state.event) {
                var e = this.state.event[i];
                if (this.isBetween(day, e)) {
                    t.push(e);
                }
            }
            var self = this, out = [
                r('div').set({key: 'day'}).style('abs', {width: '100%', top: '0px', left: '0px', pointerEvents: 'none'}).c(
                    r('div').style(isToday? s.active : {width: '25px', height: '25px'}).c(day)
                )
            ], w = (100 / t.length), self = this;
            for (var i in t) {
                (function(i) {
                    var tmp = r('div').style('click', s.event, {background: self.color(t[i].user)}).set({key: i});
                    if (t[i]._id) {
                        tmp.on('click', function() {
                            self.setState({edit: t[i]});
                        })
                    }
                    out.push(tmp.c(t[i].name));
                })(i);
            }
            return out;
        },

        render: function() {
            var days = this.days(), line = [], row = [], size = 7;
            var nameDay = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            for (var i in nameDay) {
                row.push(r('div').set({key: i + '.day.row'}).style(s.box, {height: '30px'}).c(nameDay[i]));
            }
            line.push(r('div').set({key: 'day.row'}).style(s.line, {height: '35px', fontWeight: 'bold'}).c(row));
            row = [];
            for (var i = 0; i < days; i++) {
                var l = line.length;
                if (row.length >= size) {
                    line.push(r('div').set({key: l + '.row'}).style(s.line).c(row));
                    row = [];
                }
                row.push(r('div').style(s.box, {overflow: 'auto'}).set({key: l + '.' + row.length}).c(this.row(i + 1)));
            }
            row.push(r('div').style({height: '100px', width: ((size - row.length) * (100 / size)) + '%', float: 'left'}).set({key: l + '.pad'}).c());
            line.push(r('div').set({key: line.length + '.row'}).style({overflow: 'auto'}).c(row));


            var self = this, load = this.state.load;
            return r('div').style({pointerEvent: (load)? 'none' : 'all'}).c(
                r('socket').set({shard: this.props.shard}).on('change', function(res) {
                    console.log(res);
                }).c(),
                r('div').style({padding: (load)? '0px' : '20px', opacity: (load)? '0' : '1'}, 'anim').c(
                    //r('div').c(days + ' ' + this.props.shard),
                    r('div').style({overflow: 'auto', position: 'relative'}).c(
                        line
                    )
                ),
                r('div').style('abs', {bottom: '0px', right: '0px'}).c(
                    r('div').style('click', s.add).on('click', function() {
                        self.setState({add: true, type: 'add'});
                    }).c('+')
                ),

                r(info.page + '.form').set({show: this.state.add, data: this.state.form}).on('change', function(res) {
                    self.setState({form: res});
                }).on('close', function(res) {
                    if (res) {
                        if (self.state.type == 'add') {
                            self.create(self.state.form);
                        } else {
                            for (var i in self.state.meta) {
                                self.state.form[i] = self.state.meta[i];
                            }
                            self.update(self.state.form);
                        }
                    }
                    self.setState({add: false, form: {}});
                }).c(),

                r(info.page + '.edit').set({data: this.state.edit, open: this.state.edit}).on('close', function(res) {
                    if (res) {
                        self.get();
                    }
                    self.setState({edit: null});
                }).on('click', function(res) {
                    if (res == 'edit') {
                        var s = new Date(self.state.edit.start), e = new Date(self.state.edit.end);
                        self.setState({add: true, edit: null, type: 'edit', meta: {
                            id: self.state.edit._id,
                            user: self.state.edit.user,
                        }, form: {
                            name: self.state.edit.name,
                            description: self.state.edit.description,
                            startDate: s.toISOString().split('T')[0],
                            startTime: s.toUTCString().split(' ')[4],
                            endDate: e.toISOString().split('T')[0],
                            endTime: e.toUTCString().split(' ')[4],
                        }});
                    }
                    if (res == 'remove') {
                        self.setState({edit: null});
                        self.remove(self.state.edit._id);
                    }
                }).c()
            );
        }
    });
})(_App || (_App = {}));

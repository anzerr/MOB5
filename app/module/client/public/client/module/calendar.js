var _App;
(function($) {
    "use strict";

    var info = {
        page: 'chat'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);

    var calendar = r.create({
        getInitialState: function() {
            return ({offset: 0});
        },

        offset: {
            1: 0,
            2: -3,
            3: 0,
            4: -1,
            5: 0,
            6: -1,
            7: 0,
            8: 0,
            9: -1,
            10: 0,
            11: -1,
            12: 0,
            13: 0
        },

        range: function(raw) {
            var a = new Date(), b = new Date(), n = (a.getMonth() + this.state.offset);
            n = ((n < 0) ? 13 : 1) + (n % 12);
            a.setDate(1);
            a.setHours(0, 0, 0);
            a.setMonth(a.getMonth() + this.state.offset);
            b.setDate(this.offset[n]);
            b.setHours(23, 59, 59);
            b.setMonth(b.getMonth() + this.state.offset + 1);
            return [raw? a : a.getTime(), raw? b : b.getTime(), a.getMonth() + (a.getYear() * 12)]; // start, end, shard
        },

        render: function() {
            var self = this, range = this.range(true);
            return r('div').c(
                r('div').c('offset:' +  self.state.offset),
                r('div').c('date:' + range[0].toString() + ' to ' + range[1].toString(), ' month ' + range[2]),
                r('div').on('click', function() {
                    self.setState({offset: self.state.offset - 1});
                }).c('back'),
                r('div').on('click', function() {
                    self.setState({offset: self.state.offset + 1});
                }).c('forward'),
                r('calendar.shard').set({selected: this.state.shard}).on('change', function(res) {
                    self.setState({shard: res});
                }).c(),
                (this.state.shard)? r('calendar.grid').set({start: range[0], end: range[1], shard: this.state.shard + 'a' + range[2]}).c() : null
            );
        }
    });

    $.page.add('calendar', {
        index: function() {
            ReactDOM.render(r(calendar).c(), document.getElementById('container'));
            return (true);
        }
    });
})(_App || (_App = {}));

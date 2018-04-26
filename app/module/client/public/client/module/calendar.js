var _App;
(function($) {
    "use strict";

    var info = {
        page: 'chat'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);

    var block = {float: 'left', width: 'calc(50% - 40px)', padding: '5px', background: 'black', color: 'white', margin: '0px 10px', borderRadius: '10px'};

    r.create('service.calendar', {
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
            return r('div').style({overflow: 'auto'}, 'full').c(
                //r('div').c('offset:' +  self.state.offset),
                r('div').style({overflow: 'auto', textAlign: 'center', margin: '10px 0px'}).c(
                    r('div').style(block).c(range[0].toUTCString()),
                    r('div').style({float: 'left', width: '40px'}).c('to'),
                    r('div').style(block).c(range[1].toUTCString())
                ),
                r('div').style({overflow: 'auto', textAlign: 'center', margin: '10px 0px'}).c(
                    r('div').style({float: 'left', width: '50%'}).c(
                        r('div').class('ui button small').on('click', function() {
                            self.setState({offset: self.state.offset - 1});
                        }).c(r('i').class('angle left icon').style({padding: '0px', margin: '0px'}).c())
                    ),
                    r('div').style({float: 'left', width: '50%'}).c(
                        r('div').class('ui button small').on('click', function() {
                            self.setState({offset: self.state.offset + 1});
                        }).c(r('i').class('angle right icon').style({padding: '0px', margin: '0px'}).c())
                    )
                ),

                r('div').style({overflow: 'auto', textAlign: 'center', margin: '10px 0px'}).c(
                    r('calendar.shard').set({selected: this.state.shard}).on('change', function(res) {
                        self.setState({shard: res});
                    }, true).c()
                ),

                (this.state.shard)? r('calendar.grid').set({start: range[0], end: range[1], shard: this.state.shard + 'a' + range[2]}).c() : null
            );
        }
    });
})(_App || (_App = {}));

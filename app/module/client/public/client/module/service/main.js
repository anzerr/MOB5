var _App;
(function($) {
    "use strict";

    var info = {
        page: 'service'
    };
    var deus = new $._deus(info.page), r = deus.pub();

    var url = "https://www.meteoblue.com/en/weather/widget/daily/paris_france_2988507?geoloc=fixed&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&winddirection=0&winddirection=1&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&spot=1&pressure=0&layout=light";
    if (!localStorage.getItem('user')) {
        var user = 'nano_' + $.util.random(32);
        localStorage.setItem('user', user);
    } else {
        user = localStorage.getItem('user');
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


    r.create(info.page + '.index', {
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

        componentDidMount: function() {
            var self = this, range = this.range(true);
            var s = $.json.parse(localStorage.getItem('shard')) || [];
            this.setState({shard: s});
            var wait = [];
            for (var i in s) {
                wait.push(this.get(s[i] + 'a' + range[2]));
            }
            this.setState({load: true});
            $.all(wait).then(function(res) {
                var a = [];
                for (var i in res) {
                    a = a.concat(res[i]);
                }
                console.log(a);
                a.sort(function(a, b) {
                    return a.start - b.start;
                });
                self.setState({load: false, event: a});
            });
        },

        get: function(shard) {
            var self = this;
            return $.ajax({
                url: $.url + '/event/' + shard,
                method: 'GET',
                data: {user: user}
            }).then(function(msg) {
                return msg;
            }, function() {
                $.route.redirect('/error/N3');
            });
        },

        color: function(str) {
            return '#' + intToRGB(hashCode(str));
        },

        render: function() {
            var self = this, e = [];

            for (var i in this.state.event) {
                e.push(r('div').set({key: i}).style({background: this.color(this.state.event[i].user), margin: '10px'}).c(
                    r('h3').c(this.state.event[i].name),
                    r('div').c(this.state.event[i].description),
                    r('div').c(new Date(this.state.event[i].start).toString()),
                ))
            }

            return (r('div').style({width: '100%', height: '100%', position: 'relative', textAlign: 'center'}).c(
                r('part.loader').set({show: this.state.load}).c(),
                r('div').style({width: '216px', margin: '0 auto'}).c(
                    r('iframe').style({width: '216px', height: '363px'}).set({
                        src: url,
                        frameborder: '0',
                        scrolling: 'NO',
                        allowtransparency: 'true',
                        sandbox: 'allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox'
                    }).c()
                ),
                r('a').set({href: '#/calendar'}).c(
                    r('div').class('ui button').c('calendar')
                ),
                r('div').c(e)
            ))
        }
    });
})(_App || (_App = {}));

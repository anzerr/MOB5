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

    r.create(info.page + '.edit', {
        getInitialState: function() {
            return ({open: false});
        },

        color: function(str) {
            return '#' + intToRGB(hashCode(str));
        },

        render: function() {
            var self = this, size = 350, show = this.props.open, d = this.props.data || {};
            return (r('div').style('full', 'abs', {top: '0px', pointerEvents: show? 'all' : 'none'}).c(
                r('part.block').set({show: show}).on('click', function(e) {
                    if (self.props.onClose) {
                        self.props.onClose(false);
                    }
                }).c(),
                r('div').style('abs', 'anim', {
                    top: '0px',
                    left: ((!show) ? -size : 0) + 'px',
                    width: size + 'px',
                    zIndex: 100,
                    height: '100%',
                    background: 'white'
                }, this.props.style).c(
                    r('div').style({float: 'left', width: size + 'px', height: '100%', padding: '10px'}).c(
                        r('h1').c('Event'),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('ID'),
                            r('div').c(d._id)
                        ),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('user'),
                            r('div').style({background: this.color(d.user || ''), color: 'white'}).c(d.user)
                        ),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('name'),
                            r('div').c(d.name)
                        ),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('description'),
                            r('div').c(d.description)
                        ),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('start'),
                            r('div').c(new Date(d.start).toUTCString())
                        ),
                        r('div').style({margin: '10px 0px'}).c(
                            r('h3').style({margin: '2px'}).c('end'),
                            r('div').c(new Date(d.end).toUTCString())
                        ),
                        (d.user == user) ? r('div').style({overflow: 'auto', textAlign: 'center'}).c(
                            r('div').style({width: '50%', float: 'left'}).c(
                                r('span').class('ui button').on('click', function(e) {
                                    if (self.props.onClick) {
                                        self.props.onClick('edit');
                                    }
                                }).c('Edit')
                            ),
                            r('div').style({width: '50%', float: 'left'}).c(
                                r('span').class('ui button').on('click', function(e) {
                                    if (self.props.onClick) {
                                        self.props.onClick('remove');
                                    }
                                }).c('Remove')
                            )
                        ) : null
                    )
                )
            ));
            /*var self = this, data = {};
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
            );*/
        }
    });
})(_App || (_App = {}));

var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);
    var user = $.user;

    r.create('socket', {
        getInitialState: function() {
            return ({load: true});
        },

        socket: null,
        connect: function() {
            var self = this, p = $.promise(), socket = $.socket('ws://' + window.location.hostname + ':' + (Number(window.location.port) + 1));
            if (this.socket) {
                p.resolve(this.socket);
            } else {
                socket.once('open', function() {
                    self.socket = socket;
                    p.resolve(self.socket);
                });
            }
            return p;
        },

        componentDidUpdate: function(prevProps) {
            if (prevProps.shard != this.props.shard) {
                if (this.state.socket) {
                    this.state.socket.emit('unsubscribe', {shard: this.props.shard});
                    this.state.socket.emit('subscribe', {
                        data: {user: user, shard: prevProps.shard || 'none'}
                    });
                }
            }
        },

        componentDidMount: function() {
            var self = this;
            this.connect().then(function(socket) {
                socket.once('open', function() {
                    socket.on('packet', function(msg) {
                        if (self.props.onChange) {
                            self.props.onChange(msg);
                        }
                    });

                    socket.emit('subscribe', {
                        data: {user: user, shard: this.props.shard || 'none'}
                    });
                });
                self.setState({socket: socket, load: false});
            });
        },

        componentWillUnmount: function() {
            if (this.state.socket) {
                this.state.socket.emit('unsubscribe', {});
            }
        },

        render: function() {
            return r('div').c(
                (this.state.load)? r('div').style('abs', 'full', {background: 'rgba(0, 0, 0, 0.5)'}).c() : null
            );
        }
    });
})(_App || (_App = {}));

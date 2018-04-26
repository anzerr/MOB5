var _App;
(function($) {
    "use strict";

    var info = {
        page: 'calendar'
    };
    var deus = new $._deus(info.page), r = deus.pub();
    $.util.style('base', r);

    r.create(info.page + '.shard', {
        getInitialState: function() {
            return ({add: ''});
        },

        componentDidMount: function() {
            this.setState({shard: $.json.parse(localStorage.getItem('shard')) || []});
        },

        componentWillUnmount: function() {
            localStorage.setItem('shard', $.json.encode(this.state.shard) || []);
        },

        add: function(key) {
            this.state.shard.push(key);
            this.setState({shard: this.state.shard});
            localStorage.setItem('shard', $.json.encode(this.state.shard) || []);
        },

        remove: function(key) {
            for (var i in this.state.shard) {
                if (this.state.shard[i] == key) {
                    this.state.shard.splice(i, 1);
                    return this.remove(key);
                }
            }
            this.setState({shard: this.state.shard});
            localStorage.setItem('shard', $.json.encode(this.state.shard) || []);
        },

        render: function() {
            var self = this, shard = [];
            for (var i in this.state.shard) {
                ((s) => {
                    shard.push(r('span').set({key: shard.length + s}).style('click', {
                        background: 'rgba(0,0,0,' + ((i % 2 == 0) ? '0.1)' : '0.2)'),
                        color: (self.props.selected == s)? 'red' : 'black',
                        padding: '2px',
                        borderRadius: '4px',
                        margin: '5px'
                    }).on('click', function() {
                        if (self.state.togRemove) {
                            if (self.props.selected == s) {
                                self.props.onChange(null);
                            }
                            self.remove(s);
                        } else {
                            if (self.props.onChange) {
                                self.props.onChange(s);
                            }
                        }
                    }).c(
                        s,
                        /*r('span').style({float: 'right'}).on('click', function() {
                            if (self.props.selected == s) {
                                self.props.onChange(null);
                            }
                            self.remove(s);
                        }).c('REMOVE')*/
                    ))
                })(this.state.shard[i]);
            }

            return r('div').c(
                r('h3').style('click').on('click', function() {
                    self.setState({open: !self.state.open});
                }).c('Rooms', r('i').class('angle ' + ((this.state.open) ? 'up' : 'down') + ' icon').style({padding: '0px', margin: '0px'}).c()),
                (this.state.open)? r('div').c(
                    r('div').style({lineHeight: '25px', margin: '5px'}).c(shard),
                    r('form').class('ui form').c(
                        r('div').class('field').c(
                            r('part.input').set({value: this.state.add}).on('change', function(res) {
                                self.setState({add: res})
                            }).c()
                        ),
                        r('div').class('ui button').on('click', function(res) {
                            if (self.state.add != '') {
                                let found = false;
                                for (var i in self.state.shard) {
                                    if (self.state.shard[i] == self.state.add) {
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) {
                                    self.add(self.state.add);
                                    self.setState({add: ''});
                                }
                            }
                        }).c('add'),
                        r('div').class('ui button').on('click', function(res) {
                            self.setState({togRemove: !self.state.togRemove});
                        }).c((self.state.togRemove)? 'on remove' : 'off remove')
                    )
                ) : null
            );
        }
    });
})(_App || (_App = {}));

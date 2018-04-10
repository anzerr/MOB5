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
            console.log(localStorage.getItem('shard'));
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
                    shard.push(r('div').set({key: shard.length + s}).style({
                        background: 'rgba(0,0,0,' + ((i % 2 == 0) ? '0.1)' : '0.2)'),
                        color: (self.props.selected == s)? 'red' : 'black'
                    }).on('click', function() {
                        if (self.props.onChange) {
                            self.props.onChange(s);
                        }
                    }).c(
                        s,
                        r('span').style({float: 'right'}).on('click', function() {
                            if (self.props.selected == s) {
                                self.props.onChange(null);
                            }
                            self.remove(s);
                        }).c('REMOVE')
                    ))
                })(this.state.shard[i]);
            }

            return r('div').c(
                r('div').c(shard),
                r('part.input').set({value: this.state.add}).on('change', function(res) {
                    self.setState({add: res})
                }).c(),
                r('div').on('click', function(res) {
                    self.add(self.state.add);
                    self.setState({add: ''});
                }).c('add'),
            );
        }
    });
})(_App || (_App = {}));

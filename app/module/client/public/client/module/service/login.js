var _App;
(function($) {
    "use strict";

    var info = {
        page: 'service'
    };
    var deus = new $._deus(info.page), r = deus.pub();

    r.create(info.page + '.login', {
        getInitialState: function() {
            return ({load: false, user: 'root', password: 'root'});
        },

        login: function() {
            var self = this;
            self.setState({load: true});
            setTimeout(() => {
                if (self.state.password == 'root') {
                    $.route.redirect('/calendar');
                    $.info('success', 'Login successfull');
                } else {
                    $.info('error', 'Failed to login.');
                }
                return (true);
            }, 70 + (Math.random() * 20));
        },

        render: function() {
            var self = this;
            return (r('div').style({width: '100%', height: '100%', position: 'relative'}).c(
                r('part.loader').set({show: this.state.load}).c(),
                r('part.center').set({height: 100}).c(
                    r('form').class('ui form').style({width: '300px', height: '210px', padding: '10px', background: '#2b2b2b', borderRadius: '5px'}).c(
                        r('div').class('field').c(
                            r('label').style({color: 'white'}).c('User'),
                            r('div').class('field').c(
                                r('part.input').set({type: 'text', value: this.state.user}).on('change', function(e) {
                                    self.setState({user: e});
                                }).c()
                            )
                        ),
                        r('div').class('field').c(
                            r('label').style({color: 'white'}).c('Password'),
                            r('div').class('field').c(
                                r('part.input').set({type: 'password', value: this.state.password}).on('change', function(e) {
                                    self.setState({password: e});
                                }).c()
                            )
                        ),
                        r('div').style({width: '100%', overflow: 'auto'}).c(
                            r('div').class('ui button').style({float: 'right'}).on('click', function() {
                                self.login();
                            }).c('submit')
                        )
                    )
                )
            ))
        }
    });
})(_App || (_App = {}));

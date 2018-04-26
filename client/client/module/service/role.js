var _App;
(function($) {
    "use strict";

    var info = {
        page: 'service'
    };
    var deus = new $._deus(info.page), r = deus.pub();

    var key = [
        'identifiant',
        'description',
        'version'
    ], form = [];
    for (var i in key) {
        form.push({
            key: key[i],
            name: key[i],
            placeholder: key[i]
        })
    }

    r.create(info.page + '.role', {
        getInitialState: function() {
            return ({formData: {}, data: []});
        },

        componentDidMount: function() {
            var self = this;
            setTimeout(function() {
                self.get();
            }, 200)
        },

        get: function() {
            var self = this;
            self.setState({load: true});
            return $.ajax($.util.request('/role', 'GET', {})).then(function(msg) {
                if (Array.isArray(msg)) {
                    var out = [];
                    for (var i in msg) {
                        out.push({
                            id: msg[i].idRole,
                            identifiant: msg[i].identifiant,
                            description: msg[i].description,
                            version: msg[i].version + '',
                        });
                    }
                    console.log(msg, out);
                    self.setState({data: out, load: false});
                } else {
                    $.info('error', 'failed to load role.');
                }
                return (true);
            }, function() {
                $.info('error', 'failed to load role.');
                return (true);
            });
        },

        update: function(data) {
            var self = this;
            self.setState({load: true});
            return $.ajax($.util.request('/role/update', 'POST', {
                id: data.id || this.state.id,
                identifiant: data.identifiant,
                description: data.description,
                version: data.version
            })).then(function(msg) {
                $.info('success', $.json.encode(msg));
                return (self.get());
            }, function() {
                $.info('error', 'failed to update role.');
                return (true);
            });
        },

        add: function(data) {
            var self = this;
            self.setState({load: true});
            return $.ajax($.util.request('/role/add', 'POST', {
                identifiant: data.identifiant,
                description: data.description,
                version: data.version
            })).then(function(msg) {
                $.info('success', $.json.encode(msg));
                return (self.get());
            }, function() {
                $.info('error', 'failed to add role.');
                return (true);
            });
        },

        remove: function(id) {
            var self = this;
            self.setState({load: true});
            return $.ajax($.util.request('/user/remove', 'POST', {id: id})).then(function(msg) {
                $.info('success', $.json.encode(msg));
                return (self.get());
            }, function() {
                $.info('error', 'failed to load users.');
                return (true);
            });
        },

        render: function() {
            var self = this;

            var modal = r('part.modal.type').set({
                type: 'bool',
                show: this.state.show,
                size: 'full'
            }).on('click', function(type) {
                if (type == 'okay') {
                    if (self.state.type == 'add') {
                        self.add(self.state.formData).then(function() {
                            self.setState({show: false});
                        });
                    } else {
                        self.update(self.state.formData).then(function() {
                            self.setState({show: false});
                        });
                    }
                } else {
                    self.setState({show: false});
                }
            }).c(
                r('div').style({height: '100%'}).c(
                    r('part.form').set({value: self.state.formData, form: form}).on('change', function(e) {
                        self.setState({formData: e});
                    }).c()
                )
            );

            return (r('div').style('full', {overflow: 'hidden'}).c(
                r('part.loader').set({show: this.state.load}).c(),
                modal,
                r('div').style('full', {overflow: 'auto'}).c(
                    r('part.table').set({
                        map: {
                            id: {name: 'Id', custom: true},
                            identifiant: {name: 'identifiant', custom: true},
                            description: {name: 'description', custom: true},
                            version: {name: 'version', custom: true},
                            Action: {name: 'Action', custom: true}
                        },
                        value: this.state.data,
                        custom: function(id, row, ref, map, data) {
                            var key = id + '.' + row;

                            if (map.name == 'Action') {
                                return r('td').set({key: key}).c(
                                    r('a').style({color: 'black'}).set({href: '#/service/' + data.id}).on('click', function() {
                                        self.remove(self.state.data[id].id);
                                        return false;
                                    }).c(r('i').class('trash icon').c()),
                                    r('a').style({color: 'black'}).set({href: '#/service/' + data.id}).on('click', function() {
                                        self.setState({
                                            show: true,
                                            type: 'edit',
                                            formData: self.state.data[id],
                                            id: self.state.data[id].id
                                        });
                                        return false;
                                    }).c(r('i').class('chevron right icon').c())
                                );
                            }
                            return r('td').set({key: key}).c(data.toString());
                        },
                        extend: function() {
                            return r('tr').set({key: 'add'}).c(
                                r('td').set({colSpan: '14'}).style({textAlign: 'right'}).c(
                                    r('i').class('plus icon').on('click', function() {
                                        self.setState({show: true, type: 'add', formData: {}});
                                    }).c()
                                )
                            );
                        }
                    }).c()
                )
            ));
        }
    });
})(_App || (_App = {}));

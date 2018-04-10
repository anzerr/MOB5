"use strict";

const core = require('./Singularity/core.js'), base = (require('path').resolve(__dirname)).replace(/\\/g, '/');

core({
    absoluteRoot: base,
    projectRoot: base + '/app',
    command: function(c, config) {
        var hyperion = {};

        c.if('release', function() {
            config.upstartWrap = false;
            config.mongoProfile = 'build';
            hyperion.release = c.get('release') || true;
        });

        c.if('tag', function() {
            hyperion.tag = c.get('tag') || true;
        });

        c.if('version', function() {
            hyperion.version = c.get('version') || true;
        });

        config.hyperion = hyperion;

        var node = {};

        c.if('peer', function() {
            console.log(c.get('peer'));
            try {
                node.peer = JSON.parse(c.get('peer')) || [];
            } catch(e) {
                node.peer = [];
            }
        });

        config.node = node;
    }
});

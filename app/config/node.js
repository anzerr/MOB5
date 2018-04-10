"use strict";

module.exports = function(config) {
    const node = config.node || {};
    return ({
        peer: node.peer || [],
        port: config.port + 2
    });
};

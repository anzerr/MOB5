
var fs = require('fs');

var util = {
    flat: function(data) {
        var a = [];
        for (var i in data) {
            if (Array.isArray(data[i])) {
                a = a.concat(this.flat(data[i]));
            } else {
                a.push(data[i]);
            }
        }
        return a;
    },
    getFiles: function(dir) {
        var f = [], files = fs.readdirSync(dir);
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                f = f.concat(this.getFiles(name));
            } else {
                f.push(name);
            }
        }
        return (f);
    },
    script: function(dir, priority) {
        var list = this.getFiles(dir), out = [];
        if (priority) {
			files = list.sort(function(a, b) {
				return ((priority[b] || 5) - (priority[a] || 5));
			});
		}
        console.log(list);
        for (var i in list) {
            if (list[i].match(/\.js$/)) {
                out.push('<script>' + fs.readFileSync(list[i]) + '</script>');
            }
            if (list[i].match(/\.css$/)) {
                out.push('<style>' + fs.readFileSync(list[i]) + '</style>');
            }
        }
        return out;
    }
};

fs.writeFile('./build/index.html', util.flat([
    '<!DOCTYPE html>',
    '<html>',
        '<head>',
            '<meta charset="utf-8">',
            '<style>',
                'body, html {margin:0;padding:0;width:100%;height:100%;}',
                '#container {width:100%;height:100%;}',
                [ // loader
                    '.spinner {',
                        'margin: 0px auto;',
                        'width: 50px;',
                        'height: 40px;',
                        'text-align: center;',
                        'font-size: 10px;',
                    '}',

                    '.spinner > div {',
                        'background-color: #333;',
                        'height: 100%;',
                        'width: 6px;',
                        'display: inline-block;',
                        'margin: 1px;',
                        '-webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;',
                        'animation: sk-stretchdelay 1.2s infinite ease-in-out;',
                    '}',

                    '.spinner .rect2 {',
                        '-webkit-animation-delay: -1.1s;',
                        'animation-delay: -1.1s;',
                    '}',

                    '.spinner .rect3 {',
                        '-webkit-animation-delay: -1.0s;',
                        'animation-delay: -1.0s;',
                    '}',

                    '.spinner .rect4 {',
                        '-webkit-animation-delay: -0.9s;',
                        'animation-delay: -0.9s;',
                    '}',

                    '.spinner .rect5 {',
                        '-webkit-animation-delay: -0.8s;',
                        'animation-delay: -0.8s;',
                    '}',

                    '@-webkit-keyframes sk-stretchdelay {',
                        '0%, 40%, 100% { -webkit-transform: scaleY(0.4) }',
                        '20% { -webkit-transform: scaleY(1.0) }',
                    '}',

                    '@keyframes sk-stretchdelay {',
                        '0%, 40%, 100% {',
                            'transform: scaleY(0.4);',
                            '-webkit-transform: scaleY(0.4);',
                        '} 20% {',
                            'transform: scaleY(1.0);',
                            '-webkit-transform: scaleY(1.0);',
                        '}',
                    '}',

                    '#loader {',
                        'position: absolute;',
                        'z-index: 999;',
                        'top: 0px;',
                        'left: 0px;',
                        'width: 100%;',
                        'height: 100%;',
                        'background: white;',
                        '-webkit-transition: all 2000ms ease;',
                        'transition: all 2000ms ease;',
                    '}'
                ].join(' '),
            '</style>',
            [
                util.script('./libary/public/lib', {
                    './libary/public/lib/all.js': 6,
                    './libary/public/lib/promise.js': 7,
                    './libary/public/lib/type.js': 8,
                    './libary/public/lib/defined.js': 8,
                    './libary/public/lib/react.js': 6,
                    './libary/public/lib/events.js': 6,
                    './libary/public/lib/extends.js': 6,
                    './libary/public/lib/jquery-3.1.1.js': 6
                }),
                util.script('./react/public/lib'),
                util.script('./client/semantic'),
                util.script('../app/module/client/public/client/module/')
            ],
        '</head>',
        '<body>',
            [
                '<div id="loader">',
                    '<div style="height:calc(50% - 20px);"></div>',
                    '<div class="spinner">',
                        '<div class="rect1"></div>',
                        '<div class="rect2"></div>',
                        '<div class="rect3"></div>',
                        '<div class="rect4"></div>',
                        '<div class="rect5"></div>',
                    '</div>',
                '</div>'
            ].join(''),
            '<div id="container"></div>',
        '</body>',
    '</html>'
]).join('\n'), function() {
    console.log('build done');
});

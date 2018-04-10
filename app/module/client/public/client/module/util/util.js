var _App;
(function($) {
    "use strict";

    $.util.random = function(size) {
        var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < size || 32; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
    }
})(_App || (_App = {}));

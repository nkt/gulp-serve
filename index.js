var http = require('http');
var util = require('gulp-util');
var connect = require('connect');
var serveStatic = require('serve-static');

module.exports = function (config) {
  config || (config = {});
  return function () {
    var app = connect();
    if (typeof config === 'string') {
      config = {
        root: [config]
      };
    }

    if (Array.isArray(config)) {
      config = {
        root: config
      };
    }

    if (!config.root) {
      config.root = ['.'];
    }

    if (typeof config.root === 'string') {
      config.root = [config.root];
    }

    if (!config.middlewares) {
      config.middlewares = [];
    }

    if (config.middleware) {
      config.middlewares.push(config.middleware);
    }

    config.middlewares.forEach(function(middleware) {
      app.use(middleware);
    });

    config.root.forEach(function (path) {
      app.use(serveStatic(path));
    });

    if (!config.port) {
      config.port = 3000;
    }

    var server = http.createServer(app).listen(config.port, config.hostname, function () {
      var addr = server.address();
      var address = addr.address;
      var port = addr.port;
      util.log(util.colors.blue('Server started at http://' + address + ':' + port));
    });
  };
};

var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
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

    if (!config.hostname) {
      config.hostname = 'localhost';
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

    var serverInitFunction = function () {
      var addr = server.address();
      var address = addr.address;
      var port = addr.port;
      var scheme = 'http' + (config.https ? 's' : '');
      util.log(util.colors.blue('Server started at ' + scheme + '://' + address + ':' + port));
    };

    if (config.https) {
      var opts = {
        key: fs.readFileSync(config.https.key  || path.join(__dirname, 'ssl/localhost.key')),
        cert: fs.readFileSync(config.https.cert  || path.join(__dirname, 'ssl/localhost.pem')),
        ciphers: config.https.ciphers || 'EDH+CAMELLIA:EDH+aRSA:EECDH+aRSA+AESGCM:EECDH+aRSA+SHA384:EECDH+aRSA+SHA256:EECDH:+CAMELLIA256:+AES256:+CAMELLIA128:+AES128:+SSLv3:!aNULL:!eNULL:!LOW:!3DES:!MD5:!EXP:!PSK:!DSS:!RC4:!SEED:!ECDSA:CAMELLIA256-SHA:AES256-SHA:CAMELLIA128-SHA:AES128-SHA' // Intermediat Ciphers from https://wiki.mozilla.org/Security/Server_Side_TLS
      };

      var server = https.createServer(opts, app).listen(config.port, config.hostname, serverInitFunction);
    } else {
      var server = http.createServer(app).listen(config.port, config.hostname, serverInitFunction);
    }
  };
};

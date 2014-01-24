var util = require('gulp-util');
var connect = require('connect');
var http = require('http');

module.exports = function (config) {
  config || (config = {});
  var app = connect();
  if (!config instanceof Object) {
    config = {root: config};
  }
  if (config.root) {
    if (config.root instanceof String) {
      config.root = [config.root];
    }
    config.static.forEach(function (path) {
      app.use(connect.static(path));
    });
  }
  if (!config.port) {
    config.port = 3000;
  }
  http.createServer(app).listen(config.port, function () {
    util.log('Server started on ' + config.port + 'port');
  });
};
gulp-serve
==========
[![Circle CI](https://circleci.com/gh/nkt/gulp-serve/tree/master.svg?style=svg)](https://circleci.com/gh/nkt/gulp-serve/tree/master)
[![Downloads](https://img.shields.io/npm/dm/gulp-serve.svg)](https://www.npmjs.com/package/gulp-serve)

Provide connect-server functionality, using [connect.static](http://www.senchalabs.org/connect/static.html)

Install
=======
Install with [npm](https://npmjs.org/)

    npm i --save-dev gulp-serve

Usage
=====

```js
var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));
```

With HTTPS enabled (using built-in key and certificate for `localhost`):
```js
var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 443,
  https: true,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));
```

With HTTPS enabled (using self provided key and certificate):
```js
var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 443,
  https: {
    key: 'path/to/cert.key',
    cert: 'path/to/cert.pem'
  },
  middleware: function(req, res) {
    // custom optional middleware
  }
}));
```

License
=====

[![MIT](https://img.shields.io/npm/l/express.svg)](LICENSE)

gulp-serve
==========

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

License
=====

[MIT](http://opensource.org/licenses/MIT)

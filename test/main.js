var serve = require('../');
var http = require('http');
var fs = require('fs');
var should = require('should');

require('mocha');

describe('static webserver', function() {
  describe('serving', function() {
    this.timeout(10000);

    it('should serve content', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/raw-response.txt').toString();

      serve('./test/server/')();

      http.get('http://localhost:3000/', function(res) {
        res.on('data', function(body) {
          body.toString().should.equal(fixture);

          done();
        });
      });
    });

    it('should be able to modify serving content', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/modified-response.txt').toString();

      serve({
        root: './test/server/',
        port: 3001,
        middleware: require('connect-livereload')({port: 35729})
      })();

      http
        .request(
          {
            hostname: 'localhost',
            port: 3001,
            method: 'GET',
            headers: {'accept': 'text/html'}
          },
          function(res) {
            res.on('data', function(body) {
              body.toString().should.equal(fixture);
              done();
            });
          }
        )
        .end();
    });
  });
});

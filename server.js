var bsConfig = require('./bs-config.js'),          // Browser sync configuration
  bsAuth = require('./bs-auth.js'),
  compress = require('compression'),
  http = require('http'),
  serveStatic = require('serve-static');

bsAuth.options.user = 'hku';
bsAuth.options.pass = 'frontend';

try {
  var server = http.createServer((req, res) => {
    bsAuth.middleware(req, res,
      () => serveStatic('dist')(req, res,
        () => bsConfig(req, res,
          () => compress()(req, res,
            () => { }
          )
        )
      )
    )
  }).listen(process.env.PORT || 1337);
  console.log(`Started server on port ${server.address().port}`);
} catch (er) {
  console.error(er);
}
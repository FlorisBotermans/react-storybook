const basicAuth = require('basic-auth');

let options = {
  user: null,
  pass: null
};

module.exports = {
  options,
  middleware: (req, res, next) => {
    if (!options.user || !options.pass)
      return next();

    let auth = basicAuth(req);
    if (auth && auth.name === options.user && auth.pass === options.pass) {
      return next();
    } else {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', `Basic realm="BS Authorization"`);
      res.end('Access denied');
    }
  }
};
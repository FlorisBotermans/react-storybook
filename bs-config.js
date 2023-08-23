var fs = require("fs"),
  path = require("path");

function getTimestamp() {
  var now = new Date(); 
  return "[" + ((now.getHours()   < 10)?"0":"") + now.getHours()   + ":" + 
               ((now.getMinutes() < 10)?"0":"") + now.getMinutes() + ":" +
               ((now.getSeconds() < 10)?"0":"") + now.getSeconds() + "] ";
}

module.exports = function (req, res, next) {
  if(req.url.lastIndexOf('?') !== -1) {
    req.url = req.url.substr(0, req.url.lastIndexOf('?'))
  }
  if(req.url.lastIndexOf('/') === req.url.length - 1) {
    req.url += 'index.html';
  }
  if (req.url.indexOf('.') === -1) { //Redirect requests without .html extension
    req.url += '.html';
  }

  var match = req.url.match(/\[([0-9]{3})\].(html|json)/i);
  if(match) {
    var resultCode = match[1];
    var content = '';
    var filePath = path.join(path.resolve(), 'dist\\' + req.url)
    try {
      content = fs.readFileSync(filePath);
      res.writeHead(resultCode, { 
        'content-type': 'application/json; charset=utf-8',
        'content-length': content.length,
        'status': resultCode
       });
      console.log(getTimestamp() + 'Responded json with resultCode ' + resultCode + ' for ' + req.url);
      res.end(content);
    } catch(e) {
      console.log('Error: ' + filePath + ' not found.');
      res.writeHead(404);
      res.end('Error: ' + filePath + ' not found.')
    }
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    var content = '';
    var filePath = path.join(path.resolve(), 'dist\\' + req.url)
    try {
      content = fs.readFileSync(filePath);
      res.end(content);
    } catch(ex) {
      console.log('Error: ' + req.url + ' not found.');
      res.writeHead(404);
      res.end('Error: ' + filePath + ' not found.')
    }
  } else if(req.url.indexOf('.html') !== -1) {
    var url = req.url;
    var querystringPos = url.indexOf('?');
    if(querystringPos !== -1)
      url = url.substr(0, querystringPos);
    var content = null;
    var filePaths = []
    while(!content) {
      try {
        var filePath = path.join(path.resolve(), 'dist\\' + url)
        filePaths.push(filePath);
        content = fs.readFileSync(filePath);
        if(req.url !== url)
          console.log(getTimestamp() + 'Redirected "' + req.url + '" to "' + url);
      } catch(ex) {
        var pos = url.lastIndexOf('/');
        if(pos <= 0) {
          res.writeHead(404);
          content = 'Error: Cannot get ' + req.url + " \n(\n" + filePaths.join("\n") + '\n)';
        }
        url = url.substr(0, pos) + '.html';
      }
    }
    res.end(content);
  } else {
    next();
  }
}
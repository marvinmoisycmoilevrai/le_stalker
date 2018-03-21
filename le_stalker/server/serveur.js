var fs = require('fs'),
  https = require('https'),
  express = require('express'),
  app = express();

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(8080);

app.get('/', function(req, res) {
	fs.readFile("../client/index.html", function(err, data) {
	  if (err) {
	    res.writeHead(404, {'Content-Type': 'text/html'});
	    return res.end("404 Not Found");
	  }
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(data);
	  return res.end();
	});
});













//
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
//
// http.createServer(function (req, res) {
// 	fs.readFile("./index.html", function(err, data) {
// 	  if (err) {
// 	    res.writeHead(404, {'Content-Type': 'text/html'});
// 	    return res.end("404 Not Found");
// 	  }
// 	  res.writeHead(200, {'Content-Type': 'text/html'});
// 	  res.write(data);
// 	  return res.end();
// 	});
// }).listen(8080);



// var query = url.parse(req.url, true);
// var filename = "." + q.pathname;
// fs.readFile(filename, function(err, data) {
//   if (err) {
//     res.writeHead(404, {'Content-Type': 'text/html'});
//     return res.end("404 Not Found");
//   }
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(data);
//   return res.end();
// });

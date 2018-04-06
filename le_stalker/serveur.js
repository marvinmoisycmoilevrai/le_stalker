var fs = require('fs'),
  https = require('https'),
  express = require('express'),
	bodyParser = require('body-parser'),
  app = express();
  sqlite3 = require('sqlite3')

app.use(express.static('./public/static'));
app.use(bodyParser.json())

// let db = new sqlite3.Database('./database/SQL.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the database.');
// });
//
// let req = `SELECT nom_auteur,prenom_auteur,photo_url,message FROM posts WHERE date = "CALCUL"`;
//
// db.all(req, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     let nom_auteur = row.nom_auteur;
//     let prenom_auteur = row.prenom_auteur;
//     let photo_url = row.photo_url;
//     let message = row.message
//   });
// });

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(8080);

app.get('/', function(req, res) {
	fs.readFile("./public/views/index.html", function(err, data) {
	  if (err) {
	    res.writeHead(404, {'Content-Type': 'text/html'});
	    return res.end("404 Not Found");
	  }
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(data);
	  return res.end();
	});
});

app.post('/lapin', function(req,res) {
  console.log(JSON.stringify(req.body.token, null, 2));
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

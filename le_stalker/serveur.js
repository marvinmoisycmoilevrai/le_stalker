var fs = require('fs'),
  https = require('https'),
  express = require('express'),
	bodyParser = require('body-parser'),
  app = express();
  sqlite3 = require('sqlite3')

app.use(express.static('./public/static'));
app.use(bodyParser.json())

let db = new sqlite3.Database('./database/SQL.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/getPostsDate', function(req,res){
	console.log(req.url.split("?")[1]);
	datereq  = req.url.split("?")[1]
  let requete = `SELECT nom_auteur,photo_url,message,latitude,longitude FROM posts WHERE date = '2018-3'`;
  let postlist=[];
  db.all(requete, [], (err, rows) => {
    if (err) {
      throw err;
    }
		console.log(rows);
    rows.forEach((row) => {
      let post={}
      post.name = row.nom_auteur;
      post.picture = row.photo_url;
      post.message = row.message;
      post.lat = row.latitude;
      post.lng = row.longitude;
      postlist.push(post);
    });
  });
	// console.log("postlist" + postlist);
	console.log("sending response"+postlist);
	res.json(postlist)
});


app.post('/insertPosts', function(req,res) {
  // console.log(JSON.stringify(req.body, null, 2));
  insertPosts(req.body);
	res.status(200).send("ok");
});
function insertPosts(posts) {
	console.log(typeof(posts));
	for (lepost in posts){
		// console.log(posts[post]);
		let post = posts[lepost]
		db.run("INSERT OR IGNORE INTO posts (id_post,nom_auteur, photo_url,message,latitude,longitude,date) VALUES (?,?,?,?,?,?,?)", [post.id_post, post.name, post.picture,post.message, post.lat, post.lng,post.date]);
	}
	// console.log(posts);
  //       Array.from(posts).forEach(function(post) {
	// 				console.log(post);
	// 				// console.log(post);

  //       });
};

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

const port = 8000;
let express = require('express'), app = express();
let bodyParser = require('body-parser');

// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

// app.get('/', function(req, res){
  // res.render('form');// if jade
  // You should use one of line depending on type of frontend you are with
  // res.sendFile(__dirname + '/form.html'); //if html file is root directory
  // let htmlData = "<html><body>Hello Fred</body></html"
  // res.sendFile("index.html"); //if html file is within public directory
  // res.send(htmlData)
// });

app.post('/',function(req,res){
   let username = req.body.username;
   let htmlData = 'Hello:' + username + "<br><br>" + process.env.SECRET
   res.send(htmlData);
   console.log(htmlData);
});

app.listen(port);

const port = 8000;
let express = require("express"),
  app = express();
let bodyParser = require("body-parser");
const crypto = require("crypto");

// app.use(express.static(__dirname + '/public'));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get('/', function(req, res){
  // res.render('form');// if jade
  // You should use one of line depending on type of frontend you are with
  // res.sendFile(__dirname + '/form.html'); //if html file is root directory
  let htmlData = "<html><body>Hello Fred</body></html"
  // res.sendFile("index.html"); //if html file is within public directory
  res.send(htmlData)
})

// for testing the concept of crypto
app.post('/hook', function (req, res) {
 var signature = req.get('X-Signature', 'sha1=')
 var bodyCrypted = require('crypto')
  .createHmac('sha1', 'SECRET83')
  .update(JSON.stringify(req.body))
  .digest('hex')

 if (bodyCrypted !== signature) {
  console.log(bodyCrypted)
  console.log(signature)
  res.status(401).send()
  return
 }

 console.log('Successful crypto analysis', JSON.stringify(req.body))
 res.status(204).send()
})

// for syncing with GitHub automatically...
app.post("/sync", function (req, res) {
  console.log(process.env.SECRET)
  //let username = req.body.username;
  //let htmlData = 'Hello:' + username + "<br><br>" + process.env.SECRET
  //res.send(htmlData);
  const hmac = crypto.createHmac('sha1', process.env.SECRET);
  console.log(hmac)
  const sig  = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  
  // let theStuff = { requestBody: req.body };
  //  res.send("OK");
  // res.send(res.json(theStuff))

  if (req.headers["x-github-event"] === "push") {
    // &&
    console.log("detected sync request...");
    res.sendStatus(200)
  } else {
    console.log("Saw a post but it wasn't a push request.")
    res.sendStatus(200)
  }
  
  //  crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(req.headers['x-hub-signature']))) {
  //  res.sendStatus(200);
  //  return;
  //} else {
  //  console.log('webhook signature incorrect: ' + Date.now() + " --" + req.headers['x-github-event']);
  //  return res.sendStatus(403);
  //}
});

app.listen(port);

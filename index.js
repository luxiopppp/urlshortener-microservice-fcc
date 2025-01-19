require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

var counter = 1;
const shortenedUrl = {};

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;
  console.log(url);
  shortenedUrl[counter] = url;
  counter += 1;
  console.log(shortenedUrl);
})

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

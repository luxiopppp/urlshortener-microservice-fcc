require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const isUrl = require('is-url');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

var counter = 0;
const shortenedUrl = {};

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;

  if (!isUrl(url)) {
    res.json({error: "invalid url"});
    return;
  }

  counter += 1;
  shortenedUrl[counter] = url;
  console.log(shortenedUrl);
  res.json({"original_url": url, "short_url": counter})
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

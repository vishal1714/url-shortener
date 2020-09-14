const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const color = require('color');
const ConnectDB = require('./config/db');
const shortcode = require('shortid');
const URL = require('./models/shorturl.model');

dotenv.config({ path: './config/config.env' });

ConnectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
//app.use(express.json({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', async (req, res, next) => {
  const shortUrls = await URL.find();
  res.render('index', { shortUrls: shortUrls });
});

app.post('/shortner', async (req, res, next) => {
  const shortid = shortcode.generate();
  const { fullurl } = req.body;
  const shorturl = process.env.BASEURL + shortid;

  var url = new URL({
    fullurl: req.body.fullurl,
    shortcode: shortid,
    shorturl: shorturl,
  });
  await url.save();
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await URL.findOne({ shortcode: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.count++;
  shortUrl.save();
  console.log(shortUrl);
  res.redirect(shortUrl.fullurl);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`);
});

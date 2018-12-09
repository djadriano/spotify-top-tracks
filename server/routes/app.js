const express = require('express');
const router = express.Router();

const SpotifyClass = require('../classes/spotify');
const spotify = new SpotifyClass();

// ----------------------------------------------
// Routes to client
// ----------------------------------------------

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/error', (req, res) => {
  res.render('index.html');
});

router.get('/user/:code', (req, res) => {
  res.render('index.html');
});

// ----------------------------------------------
// Routes to connect with Spotify API
// ----------------------------------------------

router.get('/login', (req, res) => {
  spotify.auth(res);
});

router.get('/callback-login', async (req, res) => {
  try {
    let responseAccessToken = await spotify.getToken(req.query);

    res.redirect(`/user/${responseAccessToken}`);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = router;

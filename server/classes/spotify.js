const rp = require('request-promise');

class Spotify {
  constructor() {
    this.clientId = 'f8dc6fa4c271460fae3b683293bafc06';
    this.clientSecret = '1e48209143b44efe96c3c05905fc72ba';
    this.redirectAuth = 'http://localhost:8080/callback-login/';
    this.scopes = 'user-read-private user-read-email user-top-read';
  }

  auth(res) {
    res.redirect(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${encodeURIComponent(
        this.scopes
      )}&redirect_uri=${encodeURIComponent(this.redirectAuth)}`
    );
  }

  getToken({ code }) {
    return new Promise(async (resolve, reject) => {
      if (code) {
        try {
          let responseData = await rp({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: this.redirectAuth,
              grant_type: 'authorization_code'
            },
            headers: {
              Authorization: 'Basic ' + new Buffer(`${this.clientId}:${this.clientSecret}`).toString('base64')
            },
            json: true
          });

          resolve(responseData.access_token);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('error');
      }
    });
  }
}

module.exports = Spotify;

const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');
const keys = require('../../../config/keys.json');

class GoogleClient extends Operations {
  constructor({ logger }) {
    this.logger = logger;
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.client = new OAuth2Client(this.clientId);
  }

  // verify the token
  async verify(token) {
    let ticket;
    try {
      ticket = await this.client.verifyIdToken({
        token,
        audience: this.clientId,
      });
    } catch (err) {
      console.log(err);
    }

    const payload = ticket.getPayload();
    const { hd: domain, email } = payload;

    return {
      domain,
      email,
    };
  }

  async main() {
    const oAuth2Client = await getAuthenticatedClient();
    // Make a simple request to the People API using our pre-authenticated client. The `request()` method
    // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    const res = await oAuth2Client.request({ url });
    console.log(res.data);

    // After acquiring an access_token, you may want to check on the audience, expiration,
    // or original scopes requested.  You can do that with the `getTokenInfo` method.
    const tokenInfo = await oAuth2Client.getTokenInfo(
      oAuth2Client.credentials.access_token,
    );
    console.log(tokenInfo);
  }

  getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
      const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[0],
      );

      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
    });
  }
}

module.exports = GoogleClient;

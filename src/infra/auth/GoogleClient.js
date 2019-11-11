const { OAuth2Client } = require('google-auth-library');
const { BaseRepository } = require('@amberjs/core');

class GoogleClient extends BaseRepository {
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
}

module.exports = GoogleClient;

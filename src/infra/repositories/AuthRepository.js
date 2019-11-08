const { BaseRepository } = require('@amberjs/core');

class AuthRepository extends BaseRepository {
  constructor(GoogleClient, Jwt) {
    super();

    this.GoogleClient = GoogleClient;
    this.Jwt = Jwt;
  }
  async verifyToken(token) {
    return this.GoogleClient.verify(token);
  }

  signJwt(userInfo, secretKey) {
    return this.Jwt.sign(userInfo, secretKey);
  }

  verifyJwt(token, secretKey) {
    return this.Jwt.verify(token, secretKey);
  }

  decodeJwt(token) {
    return this.Jwt.decode(token);
  }

  /////
  sign() {
    return sign(
      {
        iss: 'CodeWorkr',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
      },
      JWT_SECRET,
    );
  }
}

module.exports = AuthRepository;

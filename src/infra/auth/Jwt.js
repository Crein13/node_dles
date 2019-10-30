const { BaseRepository } = require('@amberjs/core');
const jwt = require('jsonwebtoken');

class Jwt extends BaseRepository {
  constructor({}) {
    super();
  }

  sign(userInfo, secretKey) {
    return jwt.sign(
      userInfo,
      secretKey,
      {
        expiresIn: 7600,
      },
      // (err, token) => {
      //   res.json({
      //     success: true,
      //     token: 'bearer ' + token,
      //   });
      // },
    );
  }

  verify(token, secretKey) {
    return jwt.verify(token, secretKey);
  }

  decode(token) {
    return jwt.decode(token);
  }
}

module.exports = Jwt;

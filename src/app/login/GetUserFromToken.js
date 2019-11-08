const { UNAUTHENTICATED, TOKEN_INVALID } = require('src/domain/Errors');

class GetUserFromToken {
  constructor({ UserRepository, AuthRepository }) {
    this.UserRepository = UserRepository;
    this.AuthRepository = AuthRepository;
  }

  async execute(accessToken) {
    const decodedJwt = this.AuthRepository.decodeJwt(accessToken);

    if (!decodedJwt || !decodedJwt.id) {
      throw new Error(UNAUTHENTICATED);
    }

    const user = await this.UserRepository.getById(decodedJwt.id);

    if (!user.isLoggedIn) {
      throw new Error(UNAUTHENTICATED);
    }

    try {
      await this.AuthRepository.verifyJwt(
        accessToken,
        user.loggedInAt.valueOf().toString(),
      );
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        await this.UserRepository.update(user.id, {
          isLoggedIn: false,
        });
      }
      throw new Error(TOKEN_INVALID);
    }
    return user;
  }
}

module.exports = GetUserFromToken;

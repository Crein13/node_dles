const { Operation } = require('@amberjs/core');

const AuthRepository = require('src/infra/auth/AuthRepository.js')
const {
  USER_INVALID,
  USER_LOGGED_IN,
  UNAUTHORIZED,
} = require('src/domain/Errors');

class Login extends Operation {
  constructor({ UserRepository, UserService }) {
    super();
    this.UserRepository = UserRepository;
    this.UserService = UserService;
  }

  async execute(data) {
    try {
      let authPayload = {};
      console.log('gothere', data);
      const date = new Date();
      const allowedDomains = 'gmail.com';
      if (process.env.NODE_ENV === 'test') {
        authPayload = {
          email: 'superadmin@gmail.com',
          domain: 'gmail.com',
        };
      } else {
        authPayload = await AuthRepository.verifyToken(data);
      }

      console.log('authPayload', authPayload);
      const { email } = authPayload;
      const domain = authPayload.domain || email.split('@').pop();

      let user = await this.UserRepository.getByField('email', email);
      console.log('UserRepository ', this.UserRepository);

      const today = new Date();
      today.setHours(23, 59, 59, 99);
      if (user.expiresAt && user.expiresAt) {
        user = await this.UserRepository.update(user.id, {
          isLoggedIn: false,
        });
      }
      if (user.email !== email) {
        throw new Error(USER_INVALID);
      }
      if (!allowedDomains.includes(domain) && domain) {
        throw new Error(USER_INVALID);
      }
      if (user.isLoggedIn && !data) {
        const isTokenActive =
          Math.abs(date - user.loginAt) / 1000 <= process.env.JWT_EXPIRES_IN;

        if (isTokenActive) {
          throw new Error(USER_LOGGED_IN);
        }
      }

      const { id, email: userEmail } = user;
      const userDataToUpdate = {
        loginAt: date,
        isLoggedIn: true,
      };

      user.dataValues = {
        ...user.dataValues,
        ...userDataToUpdate,
      };

      this.UserService.setUser(user);
      user = await this.UserRepository.update(user.id, userDataToUpdate);

      const secretKey = date.valueOf().toString();
      const accessToken = AuthRepository.signtJwt(
        { id, email: userEmail },
        secretKey,
      );
      const expiresIn = Number(process.env.JWT_EXPIRES_IN);

      return {
        user,
        accessToken,
        expiresIn,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

Login.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Login;

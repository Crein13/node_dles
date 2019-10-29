const { Operation } = require('@amberjs/core');

class Login extends Operation {
  constructor({ UserRepository, AuthRepository }) {
    super();
    this.UserRepository = UserRepository;
    this.AuthRepository = AuthRepository;
  }

  async execute(args, req) {
    let authPayload = {};
    const date = new Date();
    const allowedDomains = 'gmail.com';
    if (process.env.NODE_ENV === 'test') {
      authPayload = {
        email: 'superadmin@gmail.com',
        domain: 'gmail.com',
      };
    } else {
      authPayload = await this.authRepository.verifyToken(args.token);
    }

    console.log('authPayload', authPayload);
  }
}

Login.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Login;

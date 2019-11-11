const { Operation } = require('@amberjs/core');

class Login extends Operation {
  constructor({ UserRepository }) {
    this.UserRepository = UserRepository;
  }

  async execute(user) {
    try {
      await this.UserRepository.update(user.id, {
        isLoggedIn: false,
        logOutAt: new Date(),
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Login;

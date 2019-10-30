const { Operation } = require('@amberjs/core');

class Login extends Operation {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    try {
      await this.userRepository.update(user.id, {
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

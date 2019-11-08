const { Operation } = require('@amberjs/core');
class UserService extends Operation {
  constructor({ logger }) {
    this.logger = logger;
    this.user = null;
  }

  setUser(user) {
    this.user = user;

    return this;
  }

  getUser() {
    return this.user;
  }
}
module.exports = UserService;

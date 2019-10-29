const { Operation } = require('@amberjs/core');
class UserService extends Operation {
  constructor({ helpers, logger }) {
    this.helpers = helpers;
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

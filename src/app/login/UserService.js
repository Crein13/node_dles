const { Operation } = require('@amberjs/core');
class UserService extends Operation {
  constructor({ logger }) {
    super();
    this.logger = logger;
    this.user = null;
  }

  setUser(user) {
    this.user = user;

    return this.user;
  }

  getUser() {
    return this.user;
  }
}
module.exports = UserService;

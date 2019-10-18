
const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }
}

module.exports = UserRepository;


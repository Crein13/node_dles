const { Operation } = require('@amberjs/core');

class GetUserByField extends Operation {
  constructor({ UserRepository }) {
    this.UserRepository = UserRepository;
  }

  async execute(field, value) {
    try {
      return this.UserRepository.getByField(field, value);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = GetUserByField;

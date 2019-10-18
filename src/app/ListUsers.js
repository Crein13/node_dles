const { Operation } = require('@amberjs/core');

class ListUsers extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const users = await this.UserRepository.getAll({});

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

ListUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListUsers;
    

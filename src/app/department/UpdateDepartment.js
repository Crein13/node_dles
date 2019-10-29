const { Operation } = require('@amberjs/core');

class UpdateDepartment extends Operation {
  constructor({ DepartmentDepository }) {
    super();
    this.DepartmentDepository = DepartmentDepository;
  }
  async execute(id, data) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.events;

    try {
      const department = await this.DepartmentDepository.update(id, data);
      this.emit(SUCCESS, user);
    } catch (error) {
      switch (error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

UpdateDepartment.setEvents([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR',
  'NOT_FOUND',
]);

module.exports = UpdateDepartment;

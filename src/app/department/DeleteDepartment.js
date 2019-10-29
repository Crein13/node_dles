const { Operation } = require('@amberjs/core');

class DeleteDepartment extends Operation {
  constructor({ DepartmentRepository }) {
    super();
    this.DepartmentRepository = DepartmentRepository;
  }
  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      await this.DepartmentRepository.remove(id);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
}

DeleteDepartment.setEvents([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR',
  'NOT_FOUND',
]);

module.exports = DeleteDepartment;

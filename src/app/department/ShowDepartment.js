const { Operation } = require('@amberjs/core');

class ShowDepartment extends Operation {
  constructor({ DepartmentRepository }) {
    super();
    this.DepartmentRepository = DepartmentRepository;
  }
  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.eventNames;

    try {
      const department = await this.DepartmentRepository.getById(id);
      this.emit(SUCCESS, department);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details,
      });
    }
  }
}

ShowDepartment.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowDepartment;

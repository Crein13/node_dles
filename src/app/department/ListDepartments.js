const { Operation } = require('@amberjs/core');

class ListDepartments extends Operation {
  constructor({ DepartmentRepository }) {
    super();
    this.DepartmentRepository = DepartmentRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const departments = await this.DepartmentRepository.getAll({});
      console.log(departments);
      this.emit(SUCCESS, departments);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

ListDepartments.setEvents([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR',
  'NOT_FOUND',
]);

module.exports = ListDepartments;

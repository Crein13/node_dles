const { Operation } = require('@amberjs/core');
const Department = require('src/domain/Department');

class CreateDepartment extends Operation {
  constructor({ DepartmentRepository }) {
    super();
    this.DepartmentRepository = DepartmentRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const department = new Department(data);

    try {
      const newDepartment = await this.DepartmentRepository.add(
        department.toJSON(),
      );
      this.emit(SUCCESS, newDepartment);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}
CreateDepartment.setEvents([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR',
  'NOT_FOUND',
]);

module.exports = CreateDepartment;

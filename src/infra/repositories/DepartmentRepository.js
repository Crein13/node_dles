const { BaseRepository } = require('@amberjs/core');
const Department = require('src/domain/Department');

class DepartmentRepository extends BaseRepository {
  constructor({ DepartmentModel }) {
    super(DepartmentModel, Department);
  }
}

module.exports = DepartmentRepository;


const { BaseRepository } = require('@amberjs/core');

class DepartmentRepository extends BaseRepository {
  constructor({ DepartmentModel }) {
    super(DepartmentModel);
  }
}

module.exports = DepartmentRepository;


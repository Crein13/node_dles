
module.exports = {
  name: 'DepartmentModel',
  datasource: 'nodejs',
  definition: function(datasource, DataTypes) {
    const DepartmentModel = datasource.define('DepartmentModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      name : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    }, {
      tableName: 'departments',
      timestamps: true
    });

    /**
     * Examples on how to associate or set relationship with other models
     * 
     *  UserModel.associate = function () {
     *   UserModel.belongsTo(datasource.models.GroupModel, {
     *     foreignKey: 'groupId',
     *     as: 'group',
     *   });
     *  };
     * 
     * refer to sequelize documentation https://sequelize.org/master/manual/associations.html
     */
    DepartmentModel.associate = function () {
      DepartmentModel.hasMany(datasource.models.UserModel, {
        foreignKey: 'departmentId',
      });
    };

    return DepartmentModel;
  }
};
  
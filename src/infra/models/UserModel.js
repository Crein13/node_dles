
module.exports = {
  name: 'UserModel',
  datasource: 'nodejs',
  definition: function(datasource, DataTypes) {
    const UserModel = datasource.define('UserModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      fullName : {
        type: DataTypes.STRING,
        allowNull: false,
      },email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },departmentId : {
        type: DataTypes.INTEGER,
        allowNull: false
      },lastLogin : {
        type: DataTypes.DATE
      },
    }, {
      tableName: 'users',
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
    UserModel.associate = function () {
      UserModel.belongsTo(datasource.models.DepartmentModel, {
        foreignKey: 'departmentId',
        as: 'department'
      });
    };

    return UserModel;
  }
};
  
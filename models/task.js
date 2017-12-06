module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,150]
      }
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 350]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reward: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Task.hasOne(models.Assignment, {
      foreignKey: {
        allowNull: true
      }
    });
    Task.hasOne(models.Rewards, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Task;
};

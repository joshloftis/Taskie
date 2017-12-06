module.exports = (sequelize, DataTypes) => {
  const Rewards = sequelize.define('Rewards', {
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
    }
  });

  Rewards.associate = (models) => {
    Rewards.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Rewards.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Rewards;
};

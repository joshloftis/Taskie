module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Task, {
      onDelete: "cascade"
    });
    User.hasMany(models.Assignment, {
      onDelete: "cascade"
    });
    User.hasMany(models.Rewards, {
      onDelete: "cascade"
    });
  };
  return User;
};

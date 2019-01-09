const assignment = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("assignment", {
    assignment_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "An assignment must have a name."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Assignment.associate = models => {
    Assignment.belongsTo(models.User);
  };
  return Assignment;
};
export default assignment;

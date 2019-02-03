const assignment = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("assignment", {
    assignmentname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "An assignment must have a name."
        }
      }
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link: {
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

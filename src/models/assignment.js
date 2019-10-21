const assignment = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("assignment", {
    assignmentName: {
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
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: "The URL is not valid."
        }
      }
    },
    documentName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    documentUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Assignment.associate = models => {
    Assignment.belongsTo(models.User);
    Assignment.belongsToMany(models.AssignedTask, {
      through: models.UserAssignment,
      onDelete: "CASCADE"
    });
  };
  return Assignment;
};
export default assignment;

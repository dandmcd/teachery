import { validate } from "graphql";
const assignedTask = (sequelize, DataTypes) => {
  const AssignedTask = sequelize.define(
    "assignedTask",
    {
      assignmentId: {
        type: DataTypes.INTEGER,
        unique: {
          args: "noDuplicate",
          msg: "User was already assigned this task."
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ["INCOMPLETE", "COMPLETE", "REVIEWING", "GRADED"],
        allowNull: true
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          args: "noDuplicate",
          msg: "User was already assigned this task."
        }
      },
      dueDate: {
        type: DataTypes.STRING,
        validate: {
          isDate: {
            args: true,
            msg: "Enter a date in the correct format."
          }
        }
      }
    },
    {
      uniqueKeys: {
        noDuplicate: {
          fields: ["assignmentId", "assignedTo"]
        }
      }
    }
  );
  AssignedTask.associate = models => {
    AssignedTask.belongsToMany(models.Assignment, {
      through: models.UserAssignment,
      onDelete: "CASCADE"
    });
  };
  return AssignedTask;
};
export default assignedTask;

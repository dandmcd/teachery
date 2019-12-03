const assignedTask = (sequelize, DataTypes) => {
  const AssignedTask = sequelize.define(
    "assignedTask",
    {
      assignmentId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "A deck must have a name."
          }
        },
        unique: {
          args: "noDuplicate",
          msg: "User was already assigned this task."
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ["INCOMPLETE", "COMPLETE", "REVIEWING", "GRADED"],
        validate: {
          notEmpty: {
            args: true,
            msg: "A deck must have a name."
          }
        }
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "A deck must have a name."
          }
        },
        unique: {
          args: "noDuplicate",
          msg: "User was already assigned this task."
        }
      },
      assignedToName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      updatedDocumentName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updatedDocumentUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dueDate: {
        type: DataTypes.STRING,
        validate: {
          isDate: true,
          notEmpty: {
            args: true,
            msg: "A deck must have a due date."
          }
        },
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
    AssignedTask.belongsTo(models.User);
    AssignedTask.belongsToMany(models.Assignment, {
      through: models.UserAssignment,
      onDelete: "CASCADE"
    });
  };
  return AssignedTask;
};
export default assignedTask;

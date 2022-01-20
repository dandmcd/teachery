const note = (sequelize, DataTypes) => {
  const Note = sequelize.define("note", {
    assignedTaskId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "A note must have a deck associated with it.",
        },
      },
    },
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A note must have text.",
        },
      },
    },
  });
  Note.associate = (models) => {
    Note.belongsTo(models.User);
    Note.belongsTo(models.AssignedTask);
  };
  return Note;
};
export default note;

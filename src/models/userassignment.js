const userAssignment = (sequelize, DataTypes) => {
  const UserAssignment = sequelize.define("userAssignment", {});
  return UserAssignment;
};
export default userAssignment;

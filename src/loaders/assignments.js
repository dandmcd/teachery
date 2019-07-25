export const batchAssignments = async (keys, models) => {
  const assignments = await models.Assignment.findAll({
    where: {
      id: keys
    }
  });
  return keys.map(key => assignments.find(assignment => assignment.id === key));
};

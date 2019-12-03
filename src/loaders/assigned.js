export const batchAssignedTasks = async (keys, models) => {
  const assignedTasks = await models.AssignedTask.findAll({
    where: {
      id: keys
    }
  });
  return keys.map(key =>
    assignedTasks.find(assignedTask => assignedTask.id === key)
  );
};

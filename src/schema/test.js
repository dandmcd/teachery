//Previous mutation for assigntment

Mutation: {
  createAssignment: combineResolvers(
    isAuthenticated,
    async (
      parent,
      { assignmentName, note, link, status, dueDate, assignedTo },
      { models, me }
    ) => {
      const assignment = await models.Assignment.create({
        assignmentName,
        note,
        link,
        status,
        dueDate,
        assignedTo,
        userId: me.id
      });

      console.log(assignedTo);
      const user = await models.User.findAll({
        where: {
          username: assignedTo
        },
        raw: true
      });
      let idArray = user.map(function(e) {
        return e.id;
      });
      console.log(idArray);

      const userAssignment = await models.UserAssignment.create({
        assignmentId: assignment.id,
        userId: idArray
      });
      return assignment;
    }
  ),

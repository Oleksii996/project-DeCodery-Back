export const updateCurrentUser = async (req, res) => {
  const { name, gender, dueDate } = req.body;

  req.user = {
    ...req.user,
    ...(name !== undefined && { name }),
    ...(gender !== undefined && { gender }),
    ...(dueDate !== undefined && { dueDate }),
  };

  res.json(req.user);
};

export const updateCurrentUser = async (req, res) => {
  const { name, gender, dueDate } = req.body;
  const currentUser =
    typeof req.user?.toObject === "function" ? req.user.toObject() : req.user;

  const updatedUser = {
    ...currentUser,
    ...(name !== undefined && { name }),
    ...(gender !== undefined && { gender }),
    ...(dueDate !== undefined && { dueDate }),
  };

  res.json(updatedUser);
};

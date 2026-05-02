export const updateCurrentUser = async (req, res) => {
  try {
    const { name, gender, dueDate } = req.body;

    const user = req.user;

    if (name !== undefined) user.name = name;
    if (gender !== undefined) user.gender = gender;
    if (dueDate !== undefined) user.dueDate = dueDate;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Update user error' });
  }
};

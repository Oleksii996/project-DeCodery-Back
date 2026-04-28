export const getCurrentUser = async (req, res) => {
  const currentUser =
    typeof req.user?.toObject === "function" ? req.user.toObject() : req.user;

  res.json(currentUser);
};

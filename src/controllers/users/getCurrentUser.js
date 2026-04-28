export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export const loginUser = async (req, res) => {
  const { email } = req.body;

  const user = {
    id: "demo-user-id",
    name: "Demo User",
    email,
    gender: null,
    dueDate: null,
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

  res.json({ user, token });
};

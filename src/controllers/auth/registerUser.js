import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export const registerUser = async (req, res) => {
  const { name, email, gender = null, dueDate } = req.body;

  const user = {
    id: randomUUID(),
    name,
    email,
    gender,
    dueDate,
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

  res.status(201).json({ user, token });
};

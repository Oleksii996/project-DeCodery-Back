import jwt from "jsonwebtoken";

export const authThema = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен відсутній" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Недійсний токен" });
    }

    // Додаткова логіка саме для теми
    // Наприклад, перевірка ролі користувача
    if (!user || !user.role || user.role !== "user") {
      return res.status(403).json({ message: "Доступ до теми заборонено" });
    }

    req.user = user;
    next();
  });
};
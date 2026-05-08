import jwt from 'jsonwebtoken';
import { Session } from '../../models/session.js';
import { loginService } from '../../services/auth/loginUserService.js';
import {
  createSessionService,
  setSessionCookies,
} from '../../services/auth/SessionService.js';
import UserThema from '../../models/user_thema.js';

export const loginUser = async (req, res) => {
  const body = req.body;

  const { user, pregnancyProgress } = await loginService(body);
  await Session.deleteOne({ userId: user._id });

  const newSession = await createSessionService(user._id);
  setSessionCookies(res, newSession);

 // 🔑 створюємо JWT токен
  const token = jwt.sign(
    { id: user._id, role: "user" }, // важливо: role має бути тут
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 🔎 перевіряємо чи є тема для користувача
  let thema = await UserThema.findOne({ userId: user._id });
  if (!thema) {
    thema = await UserThema.create({
      userId: user._id,
      themeColor: "yellow"
    });
  }

  return res.status(201).json({
    token,
    user,
    pregnancyProgress,
    themeColor: thema.themeColor
  });
};

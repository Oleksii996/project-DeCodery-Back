import UserThema from "../../models/UserThema.js";

export const updateTheme = async (req, res) => {
  try {
    const userId = req.user.id;
    const { color } = req.body;

    const thema = await UserThema.findOneAndUpdate(
      { userId },
      { themeColor: color, updatedAt: Date.now() },
      { new: true, upsert: true } // створить новий запис, якщо ще немає
    );

    res.json({ message: `Тема змінена на ${thema.themeColor}` });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};
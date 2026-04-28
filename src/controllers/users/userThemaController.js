import UserThema from "../../models/user_thema.js";

export const updateTheme = async (req, res) => {
  try {
    const { userId, color } = req.body;

    const thema = await UserThema.findOneAndUpdate(
      { userId },
      { themeColor: color, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.json({
      message: `Тема змінена на ${thema.themeColor}`,
      thema
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};
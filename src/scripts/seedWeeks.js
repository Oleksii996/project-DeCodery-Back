import mongoose from "mongoose";
import { babyStateModel } from "../models/baby_state.js";
import { momStateModel } from "../models/mom_state.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const babyData = [];
const momData = [];

for (let i = 1; i <= 42; i++) {
  //  BABY
  babyData.push({
    weekNumber: i,
    size: `як фрукт тижня ${i}`,
    description: `На ${i} тижні малюк активно розвивається та росте`,
    facts: [
      `Цікавий факт: на ${i} тижні малюк вже має нові навички та поступово формуються важливі органи`,
    ],
  });

  //  MOM (ПОТОЧНА МОДЕЛЬ)
  momData.push({
    weekNumber: i,
    feelings: [
      `На ${i} тижні ти можеш відчувати зміни в тілі`,
      "Втома",
      "Емоційні зміни",
    ],
    comfortTips: [
      {
        category: "Загальне",
        tip: "Пий більше води",
      },
      {
        category: "Відпочинок",
        tip: "Відпочивай і слухай своє тіло",
      },
    ],
  });
}

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("🧹 Cleaning old data...");
    await babyStateModel.deleteMany();
    await momStateModel.deleteMany();

    console.log("🌱 Inserting new data...");
    await babyStateModel.insertMany(babyData);
    await momStateModel.insertMany(momData);

    console.log("✅ Seed completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

seed();
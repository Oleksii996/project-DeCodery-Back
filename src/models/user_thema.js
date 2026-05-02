import mongoose from "mongoose";
import { User } from "./user.js"; 

const userThemaSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true
  },
  themeColor: { 
    type: String, 
    enum: ["yellow", "blue", "pink"], 
    default: "yellow" 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

userThemaSchema.pre("save", async function () {
  if (this.isNew) {
    const user = await User.findById(this.userId);
    if (user) {
      if (user.gender === "boy") {
        this.themeColor = "blue";
      } else if (user.gender === "girl") {
        this.themeColor = "pink";
      } else {
        this.themeColor = "yellow"; // стандартний
      }
    }
  }
});

const UserThema = mongoose.model("UserThema", userThemaSchema);

export default UserThema
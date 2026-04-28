import mongoose from "mongoose";

const userThemaSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
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

const UserThema = mongoose.model("UserThema", userThemaSchema);

export default UserThema
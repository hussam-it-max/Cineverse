import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [
      {
        id: Number,
        title: String,
        poster_path: String,
        vote_average: Number,
      },
    ],
    default: [],
  },
});
const User = mongoose.model("User", userSchema);
export default User;

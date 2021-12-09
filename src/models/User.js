import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, require: true, unique: true },
  password: { type: String },
  name: { type: String, require: true },
  location: String,
//   videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

//패스워드 해싱
userSchema.pre("save", async function () {
    //(해싱할 변수?, 해싱 횟수, 콜백 함수)
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
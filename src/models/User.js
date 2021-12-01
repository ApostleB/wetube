import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  location: String,
});

//패스워드 해싱
userSchema.pre("save", async function () {
    console.log("Hash before Password", this.password);
    //(해싱할 변수?, 해싱 횟수, 콜백 함수)
    this.password = await bcrypt.hash(this.password, 5);
    console.log("Hash after password", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
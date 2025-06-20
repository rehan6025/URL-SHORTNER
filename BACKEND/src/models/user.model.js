import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from queries by default
  },
  avatar: {
    type: String,
    required: false,
    default: function () {
      if (this.email) {
        const md5Hash = crypto
          .createHash("md5")
          .update(this.email.toLowerCase().trim())
          .digest("hex");
        return `https://www.gravatar.com/avatar/${md5Hash}?d=identicon`;
      }
      return "https://www.gravatar.com/avatar/?d=mp"; // Default mystery person if no email
    },
  },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

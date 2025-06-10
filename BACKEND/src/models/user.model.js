import mongoose from "mongoose";
import crypto from "crypto";

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

const User = mongoose.model("User", userSchema);
export default User;

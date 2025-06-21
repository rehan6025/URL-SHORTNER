import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { wrapAsync } from "../utils/errorHandler.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, newUser } = await registerUser(name, email, password);
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user: newUser, message: "User registered successfully" });
});

export const login_user = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user: user, message: "User logged in successfully" });
});

export const logout_user = (req, res) => {
  res.clearCookie("accessToken", cookieOptions);

  res.status(200).json({ message: "User logged out successfully" });
};

export const get_current_user = (req, res) => {
  res.status(200).json({ user: req.user });
};

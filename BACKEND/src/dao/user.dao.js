import User from "../models/user.model.js";
import urlSchema from "../models/short_url.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByEmailByPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, email, password) => {
  const user = new User({ name, email, password });
  await user.save();
  return user;
};

export const getAllUserUrl = async (id) => {
  return await urlSchema.find({ user: id });
};

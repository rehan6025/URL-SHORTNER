import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = (lenght) => {
  return nanoid(lenght);
};

export const signToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, cookieOptions);
};

export const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};

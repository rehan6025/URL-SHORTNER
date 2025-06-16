import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = (lenght) => {
  return nanoid(lenght);
};

export const signToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    throw error;
  }
};

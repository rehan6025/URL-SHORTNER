export const cookieOptions = {
  maxAge: 60 * 60 * 1000, // 1 hour
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

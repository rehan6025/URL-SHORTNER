export const cookieOptions = {
  maxAge: 5 * 60 * 1000, // 5 minutes
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

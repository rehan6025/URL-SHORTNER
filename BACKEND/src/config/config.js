export const cookieOptions = {
  maxAge: 60 * 60 * 24 * 1000, // 24 hours
  httpOnly: true,
  sameSite: "none",
  secure: true, // Always true for production with HTTPS
  domain: undefined, // Let the browser handle domain
};

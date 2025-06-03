import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  // short own logic for prev deletes :) -- await urlSchema.deleteMany({ full_url: url });

  if (!shortUrl) throw new Error("Short Url not generated");

  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId) => {
  const shortUrl = generateNanoId(7);
  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};

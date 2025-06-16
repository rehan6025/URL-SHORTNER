import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";
import { wrapAsync } from "../utils/errorHandler.js";

export const createShortUrl = wrapAsync(async (req, res, next) => {
  const data = req.body;
  let shortUrl;

  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("URL not found");
  }
});

export const createCustomShortUrl = wrapAsync(async (req, res, next) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithCustomUrl(url, slug);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

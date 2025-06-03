import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
  const { url, user_id } = req.body;
  let shortUrl;
  if (user_id) {
    shortUrl = await createShortUrlWithUser(url, user_id);
  } else {
    shortUrl = await createShortUrlWithoutUser(url);
  }
  res.send(process.env.APP_URL + shortUrl);
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("URL not found");
  }
};

import urlSchema from "../models/short_url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getShortUrl = async (id) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );
};

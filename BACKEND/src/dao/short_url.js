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

    const savedDoc = await newUrl.save();
    return savedDoc;
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

export const getCustomShortUrl = async (slug) => {
  return await urlSchema.findOne({ short_url: slug });
};

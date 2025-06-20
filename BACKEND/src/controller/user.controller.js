import { getAllUserUrl } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    const urls = await getAllUserUrl(userId);
    res.status(200).json({ message: "success", urls });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user URLs", error: error.message });
  }
};

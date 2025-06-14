import express from "express";
const app = express();
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is now running on http://localhost:3000");
});

//GET - redirection
//POST- create short url

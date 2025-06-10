import express from "express";
const app = express();
import connectDB from "./src/config/mongo.config.js";
import auth_routes from "./src/routes/auth.routes.js";
import short_url from "./src/routes/short_url.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is now running on http://localhost:3000");
});

//GET - redirection
//POST- create short url

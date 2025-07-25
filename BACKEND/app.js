import express from "express";
const app = express();
import connectDB from "./src/config/mongo.config.js";
import auth_routes from "./src/routes/auth.routes.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachUser);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.use("/api/user", user_routes);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is now running on http://localhost:3000");
});

//GET - redirection
//POST- create short url

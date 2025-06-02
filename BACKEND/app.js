import express from "express";
const app = express();
import connectDB from "./src/config/mongo.config.js";

import { nanoid } from "nanoid";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const { url } = req.body;
  console.log(url);
  // Here you would typically save the URL to a database
  res.send(nanoid(7));
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is now running on http://localhost:3000");
});

//GET - redirection
//POST- create short url

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import sequelize from "./config/connection.js";
import "dotenv/config";

import { port } from "./config/env.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Add CORS middleware here
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true, // Ensure cookies are sent with requests
  })
);

// Allow credentials in headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(resolve(join(__dirname, "..", "client/dist/index.html")));
  });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is up and listening on port ${PORT}.`)
  );
});

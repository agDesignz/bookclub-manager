const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require('./routes');
const sequelize = require('./config/connection');
require('dotenv').config();


const { port } = require("./config/env");

const PORT = port || 4000
const app = express();

// Add CORS middleware here
app.use(cors({
  origin: process.env.CLIENT_URL, // Your frontend URL
  credentials: true, // Ensure cookies are sent with requests
}));

// Allow credentials in headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", 'client/dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client/dist/index.html'))
  })
}

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is up and listening on port ${PORT}.`));
  });
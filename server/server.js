const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const routes = require('./routes');
const sequelize = require('./config/connection');

const { port } = require("./config/env");

const PORT = port || 4000
const app = express();

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
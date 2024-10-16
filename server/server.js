const express = require("express");
const path = require('path');
const routes = require('./routes');

const { port } = require("./config");

const PORT = port || 4000
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", 'client/dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client/dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}.`);
});
const express = require("express");
const { port } = require("./config");

const app = express();

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}.`);
});
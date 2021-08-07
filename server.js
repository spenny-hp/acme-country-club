const db = require("./db");
const express = require("express");
const app = express();

const init = async () => {
  await db.syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
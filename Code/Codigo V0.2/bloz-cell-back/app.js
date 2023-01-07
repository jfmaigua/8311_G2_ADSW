require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./config/mongo");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
//invoncamos rutas
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


databaseConnection();

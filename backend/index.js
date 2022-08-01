const express = require("express");
const app = express();
const { port } = require("./config");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./db/mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", apiRouter);

app.listen(port, () => {
  console.log(`Server is listining in port ${port}`);
});

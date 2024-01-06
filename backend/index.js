const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/image'));

// parse application/json
app.use(bodyParser.json());
app.use("/user", require("./src/route/route"));
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

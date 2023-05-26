const express = require("express");

const app = express();

const port = 3000;

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

//
const userRoute = require("./routes/user.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cors());
//
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`port http://localhost:${port}`);
});

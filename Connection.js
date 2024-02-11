const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

console.log(`DDDB`, process.env.DB_URL);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}),
  (err) => {
    console.log(err);
  };

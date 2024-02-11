const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  subject: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
});

const DBModel = mongoose.model("Mails", Schema);

module.exports = DBModel;

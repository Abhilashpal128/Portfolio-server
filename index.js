const express = require("express");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

const PORT = 5000;
require("./Connection");
const cors = require("cors");
const Mail = require("./Schema");
const ValidateEmail = require("./Middleware/Validator");

const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.post("/Validate", ValidateEmail, (req, res) => {
  const { name, email, subject, message } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  res.send(`Email ${email} is valid.`);
  res.send(`name: ${name} `);
  res.send(`message: ${message}`);
});

// app.post("/validate",(req,res)=>{
//   const { name, email, message } = req.body;

// })

app.post("/mail", ValidateEmail, async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(404).json({ message: "All Feilds Are Mendatory" });
  }

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const Data = new Mail(req.body);

  const result = await Data.save();
  console.log(result);
  res.status(200).json({ message: "Mail saved successfully" });
});

app.post("/send-mail", ValidateEmail, async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(404).json({ message: "All feilds Are mendatory" });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_Email,
      pass: process.env.App_Pass,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MY_Email,
    subject: subject,
    text: `Name: ${name}\n\n Form: ${email}\n\nmessage: ${message}`,
  };

  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT);

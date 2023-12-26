var express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  // Access uploaded file information
  const file = req.upfile;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Process file information
  const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };

  // Respond with JSON containing file information
  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

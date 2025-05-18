const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const { readdirSync } = require("fs");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

if (fs.existsSync("./routes")) {
  readdirSync("./routes").forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        app.use("/api", require("./routes/" + file));
        console.log(`✅ Loaded route: ${file}`);
      } catch (err) {
        console.log(`❌ Error loading route ${file}:`, err);
      }
    }
  });
} else {
  console.warn("⚠️  No routes folder found");
}

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;

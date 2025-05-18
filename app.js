const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const { readdirSync } = require("fs");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

readdirSync("./routes").map((i) => {
  try {
    app.use("/api", require("./routes/" + i));
    console.log(`Loading route: ${i}`);
  } catch (err) {
    console.error(`Error loading route ${i}:`, err);
  }
});

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;

const mongoose = require("mongoose");
const conceptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tag: String,
  date: { type: Date, default: Date.now },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" }
});

module.exports = mongoose.model("Concept", conceptSchema);

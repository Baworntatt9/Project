const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: [String], default: ["Uncategorized"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Idea", IdeaSchema);

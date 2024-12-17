const express = require("express");
const router = express.Router();
const Idea = require("../models/ideaModel");

// GET: ดึงไอเดียทั้งหมด
router.get("/", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { categories: category } : {};
  try {
    const ideas = await Idea.find(filter);
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: เพิ่มไอเดียใหม่
router.post("/", async (req, res) => {
  const { title, description, categories } = req.body;

  const idea = new Idea({
    title,
    description,
    categories: categories.length > 0 ? categories : ["Uncategorized"],
  });

  try {
    const newIdea = await idea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: ลบไอเดียตาม ID
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json({ message: "Idea deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

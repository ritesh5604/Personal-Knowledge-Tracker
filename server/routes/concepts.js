const express = require("express");
const router = express.Router();
const Concept = require("../models/Concept");


router.get("/", async (req, res) => {
  try {
    const concepts = await Concept.find().sort({ date: -1 });
    res.json(concepts);
  } catch (err) {
    console.error("GET /api/concepts error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// POST new concept
router.post("/", async (req, res) => {
  try {
    const concept = new Concept(req.body);
    await concept.save();
    res.status(201).json(concept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update concept
router.put("/:id", async (req, res) => {
  try {
    const updated = await Concept.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE concept
router.delete("/:id", async (req, res) => {
  try {
    await Concept.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

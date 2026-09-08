const express = require('express');
const router = express.Router();
const { db, saveDb } = require('../db');

// Get all roadmap features
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: db.roadmap.length,
    features: db.roadmap
  });
});

// Create a new roadmap feature
router.post('/', (req, res) => {
  const { title, category, quarter } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Feature title is required' });
  }

  const newFeature = {
    id: `road_${Date.now()}`,
    title,
    category: category || 'Core Platform',
    quarter: quarter || 'Q4 2026',
    votes: 1,
    status: 'Planned'
  };

  db.roadmap.push(newFeature);
  saveDb();

  res.status(201).json({
    success: true,
    feature: newFeature
  });
});

// Upvote a roadmap feature
router.post('/:id/upvote', (req, res) => {
  const { id } = req.params;
  const feature = db.roadmap.find(f => f.id === id);

  if (!feature) {
    return res.status(404).json({ success: false, error: 'Feature not found' });
  }

  feature.votes += 1;
  saveDb();

  res.json({
    success: true,
    feature
  });
});

module.exports = router;

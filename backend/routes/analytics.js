const express = require('express');
const router = express.Router();
const { db } = require('../db');

// Get overall analytics summary
router.get('/summary', (req, res) => {
  res.json({
    success: true,
    data: db.analytics
  });
});

// Get revenue & user trends
router.get('/trends', (req, res) => {
  res.json({
    success: true,
    trends: db.analytics.monthly_trends
  });
});

module.exports = router;

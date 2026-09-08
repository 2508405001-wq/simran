const express = require('express');
const router = express.Router();
const { db, saveDb } = require('../db');

// Get team members
router.get('/members', (req, res) => {
  res.json({
    success: true,
    members: db.team
  });
});

// Add team member
router.post('/members', (req, res) => {
  const { name, role, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  const newMember = {
    id: `mem_${Date.now()}`,
    name,
    role: role || 'Contributor',
    status: 'Online',
    email
  };

  db.team.push(newMember);
  saveDb();

  res.status(201).json({
    success: true,
    member: newMember
  });
});

// Get team activity feed
router.get('/activity', (req, res) => {
  res.json({
    success: true,
    activity: db.activity_feed
  });
});

// Post activity / comment
router.post('/activity', (req, res) => {
  const { user, action } = req.body;
  if (!action) {
    return res.status(400).json({ success: false, error: 'Action/comment text is required' });
  }

  const newActivity = {
    id: `act_${Date.now()}`,
    user: user || db.user.name,
    action,
    timestamp: 'Just now'
  };

  db.activity_feed.unshift(newActivity);
  saveDb();

  res.status(201).json({
    success: true,
    activity: newActivity
  });
});

module.exports = router;

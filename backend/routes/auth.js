const express = require('express');
const router = express.Router();
const { db, saveDb } = require('../db');

// Get current user profile
router.get('/me', (req, res) => {
  res.json({
    success: true,
    user: db.user
  });
});

// Update user profile
router.put('/me', (req, res) => {
  const { name, email, role, company } = req.body;
  if (name) db.user.name = name;
  if (email) db.user.email = email;
  if (role) db.user.role = role;
  if (company) db.user.company = company;
  saveDb();

  res.json({
    success: true,
    message: 'User profile updated successfully',
    user: db.user
  });
});

// Generate new API Key
router.post('/api-keys', (req, res) => {
  const { name } = req.body;
  const newKey = {
    id: `key_${Date.now()}`,
    name: name || 'New API Key',
    key: `ff_live_${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 5)}`,
    created: new Date().toISOString().split('T')[0]
  };

  db.user.api_keys.push(newKey);
  saveDb();

  res.status(201).json({
    success: true,
    message: 'API Key generated successfully',
    key: newKey
  });
});

// Revoke API Key
router.delete('/api-keys/:id', (req, res) => {
  const { id } = req.params;
  db.user.api_keys = db.user.api_keys.filter(k => k.id !== id);
  saveDb();

  res.json({
    success: true,
    message: `API Key ${id} revoked successfully`
  });
});

module.exports = router;

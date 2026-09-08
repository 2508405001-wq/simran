const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'FlowForge SaaS REST API',
    timestamp: new Date().toISOString(),
    uptime_seconds: process.uptime(),
    version: '1.0.0'
  });
});

module.exports = router;

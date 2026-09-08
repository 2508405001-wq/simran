const express = require('express');
const router = express.Router();
const { db, saveDb } = require('../db');

// Get Liquid Precision settings
router.get('/liquid-precision', (req, res) => {
  res.json({
    success: true,
    data: db.liquid_precision
  });
});

// Update Liquid Precision parameters
router.put('/liquid-precision', (req, res) => {
  const { flow_rate_lpm, viscosity_index, pressure_psi, temperature_c, auto_balance, alert_threshold_psi } = req.body;

  if (flow_rate_lpm !== undefined) db.liquid_precision.flow_rate_lpm = parseFloat(flow_rate_lpm);
  if (viscosity_index !== undefined) db.liquid_precision.viscosity_index = parseFloat(viscosity_index);
  if (pressure_psi !== undefined) db.liquid_precision.pressure_psi = parseFloat(pressure_psi);
  if (temperature_c !== undefined) db.liquid_precision.temperature_c = parseFloat(temperature_c);
  if (auto_balance !== undefined) db.liquid_precision.auto_balance = Boolean(auto_balance);
  if (alert_threshold_psi !== undefined) db.liquid_precision.alert_threshold_psi = parseFloat(alert_threshold_psi);

  saveDb();

  res.json({
    success: true,
    message: 'Liquid Precision parameters updated successfully',
    data: db.liquid_precision
  });
});

module.exports = router;

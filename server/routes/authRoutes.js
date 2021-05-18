const express = require('express');
const authRoutes = express.Router();

authRoutes.get('/google', (req, res) => res.send('test'));

authRoutes.get('/google/redirect', (req, res) => res.send('test redirect'));

module.exports = authRoutes;
const express = require('express');
const router = express.Router();
const { getFitnessDatas, addFitness, getFitnessData, deleteFitness, updateFitnessData } = require('../controllers/fitnessController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all Fitness datas
router.get('/', getFitnessDatas);

// POST a new Fitness data
router.post('/', addFitness);

// GET a single Fitness data
router.get('/:id', getFitnessData);

// DELETE a Fitness data
router.delete('/:id', deleteFitness);

// Update Fitness data using PUT
router.put('/:id', updateFitnessData);

module.exports = router;
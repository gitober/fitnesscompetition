const mongoose = require('mongoose');
const Fitness = require('../models/fitnessModel');

// get all Fitness data
const getFitnessDatas = async (req, res) => {
  const user_id = req.user._id

  try {
    const fitness = await Fitness.find({user_id}).sort({createdAt: -1})
    res.status(200).json(fitness)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Fitness data 
const addFitness = async (req, res) => {
  const {title, date, duration, caloriesBurned} = req.body;

  try {
    const user_id = req.user._id;
    const newFitness = new Fitness({ title, date, duration, caloriesBurned, user_id });
    await newFitness.save();
    res.status(201).json(newFitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get single Fitness data by ID
const getFitnessData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such fitness data'});
  }

  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findById(id).where('user_id').equals(user_id);
    if (!fitness) {
      return res.status(404).json({ message: 'fitness data not found' });
    }
    res.status(200).json(fitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Fitness data by ID
const deleteFitness = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findOneAndDelete({ _id: id, user_id: user_id });
    if (!fitness) {
      return res.status(404).json({ message: 'Fitness data not found' });
    }
    res.status(200).json({ message: 'Fitness data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}


// Update Fitness Data by ID
const updateFitnessData = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!fitness) {
      return res.status(404).json({ message: 'Fitness not found' });
    }
    res.status(200).json(fitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getFitnessDatas,
  addFitness,
  getFitnessData,
  deleteFitness,
  updateFitnessData
};
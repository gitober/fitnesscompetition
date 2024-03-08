const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: false },
  user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Fitness', fitnessSchema);
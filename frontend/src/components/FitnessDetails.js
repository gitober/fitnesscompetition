import React from 'react';
import useFitness from '../hooks/useFitness';

const FitnessDetails = ({ fitness }) => {
  const authToken = localStorage.getItem('token');
  const { deleteFitness } = useFitness(authToken);

  const handleDelete = () => {
    deleteFitness(fitness._id);
  };

  return (
    <div className="fitness-details">
      <h4>{fitness.title}</h4>
      <p>Duration: {fitness.duration}</p>
      <p>Calories Burned: {fitness.caloriesBurned}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default FitnessDetails;

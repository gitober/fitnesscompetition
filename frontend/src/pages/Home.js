// Update the import path for FitnessDetails and useFitness
import React from 'react';
import FitnessForm from '../components/FitnessForm';
import FitnessDetails from '../components/FitnessDetails';
import useFitness from '../hooks/useFitness';

const Home = () => {
  const authToken = localStorage.getItem('token');
  const { fitnessList, error } = useFitness(authToken);

  console.log('Fitness List:', fitnessList);
  console.log('Error:', error);

  return (
    <div className="home">
      <div className="fitness-list">
        {/* Display the list of fitness details */}
        {fitnessList.map((fitness) => (
          <FitnessDetails key={fitness._id} fitness={fitness} />
        ))}
      </div>
      <FitnessForm />
    </div>
  );
};

export default Home;

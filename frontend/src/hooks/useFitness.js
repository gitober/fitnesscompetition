import { useEffect, useCallback, useState } from 'react';

const useFitness = (authToken) => {
  const [fitnessList, setFitnessList] = useState([]);
  const [rerenderKey, setRerenderKey] = useState(null);
  const [error, setError] = useState(null);

  const fetchFitness = useCallback(async () => {
    try {
      const response = await fetch('/api/fitness', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFitnessList(data);
      } else {
        setError('Failed to fetch fitness data');
      }
    } catch (error) {
      setError('Error fetching fitness data');
    }
  }, [authToken]);

  useEffect(() => {
    fetchFitness();
  }, [fetchFitness, rerenderKey]);

  const addFitness = useCallback(
    async (newFitness) => {
      try {
        const response = await fetch('/api/fitness', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(newFitness),
        });

        if (response.ok) {
          setRerenderKey(Date.now());
          console.log('Fitness data added successfully');
        } else {
          const json = await response.json();
          setError(json.error || 'Failed to add fitness data');
        }
      } catch (error) {
        setError('Error adding fitness data');
      }
    },
    [authToken]
  );

  const deleteFitness = useCallback(
    async (fitnessId) => {
      try {
        const response = await fetch(`/api/fitness/${fitnessId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          setFitnessList((prevFitnessList) => prevFitnessList.filter((fitness) => fitness._id !== fitnessId));
          console.log('Fitness data deleted successfully');
        } else {
          setError('Failed to delete fitness data');
        }
      } catch (error) {
        setError('Error deleting fitness data');
      }
    },
    [authToken]
  );

  const renderDate = (date) => {
    return date ? new Date(date).toLocaleString() : 'N/A';
  };

  return {
    fitnessList,
    rerenderKey,
    error,
    addFitness,
    deleteFitness,
    renderDate,
  };
};

export default useFitness;

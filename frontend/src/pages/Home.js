import React, { useEffect, useState } from "react";
import FitnessDetails from "../components/FitnessDetails";
import FitnessForm from "../components/FitnessForm";

const Home = () => {
  const [fitnessArray, setFitnessArray] = useState([]);

  useEffect(() => {
    const getFitness = async () => {
      try {
        const response = await fetch("/api/fitness", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch fitness data");
        }
        const data = await response.json();
        setFitnessArray(data);
      } catch (error) {
        console.error("Error fetching fitness data:", error);
        setFitnessArray([]);
      }
    };
    getFitness();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/fitness/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete fitness item: ${response.status}`);
      }
      // Filter out the fitness item with the matching ID
      setFitnessArray((prevFitnessArray) =>
        prevFitnessArray.filter((fitness) => fitness._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <div className="fitness">
        {fitnessArray.length === 0 && <h2>No Goals Found</h2>}
        {fitnessArray.map((fitness) => (
          <FitnessDetails
            key={fitness._id}
            fitness={fitness}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <FitnessForm setFitnessData={setFitnessArray} />
    </div>
  );
};

export default Home;

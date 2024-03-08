import React from "react";
import useField from "../hooks/useField"; // Import useField

const FitnessForm = ({ setFitnessData }) => {
  const apiUrl = "/api/fitness";
  const titleInput = useField("text");
  const DateInput = useField("text");
  const caloriesBurnedInput = useField("text");
  const durationInput = useField("text");
  const user = localStorage.getItem("username");

  const handleFitness = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Check if the user is logged in before submitting the form
    if (!token) {
      console.error("You must be logged in to add fitness data");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          title: titleInput.value,
          user,
          date: DateInput.value,
          caloriesBurned: caloriesBurnedInput.value,
          duration: durationInput.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add fitness data");
      }

      const newFitnessData = await response.json();
      setFitnessData((prevData) => [...prevData, newFitnessData]);

      // Clear the form fields
      titleInput.onChange({ target: { value: "" } });
      DateInput.onChange({ target: { value: "" } });
      caloriesBurnedInput.onChange({ target: { value: "" } });
      durationInput.onChange({ target: { value: "" } });
    } catch (error) {
      console.error("Error adding fitness:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleFitness}>
      <h3>Add a New Fitness</h3>

      <label>Title:</label>
      <input {...titleInput} />
      <label>Date:</label>
      <input {...DateInput} />
      <label>Calories Burned:</label>
      <input {...caloriesBurnedInput} />
      <label>Duration:</label>
      <input {...durationInput} />
      <button type="submit">Add Fitness</button>
    </form>
  );
};

export default FitnessForm;

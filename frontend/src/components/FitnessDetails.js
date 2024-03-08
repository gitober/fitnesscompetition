import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FitnessDetails = ({ fitness, onDelete }) => {
  const handleDelete = () => {
    onDelete(fitness._id); // Make sure fitness._id is defined
  };

  const formatDate = (date) => {
    if (!date) return ""; // Handle null, undefined, or empty date values

    try {
      const formattedDate = formatDistanceToNow(new Date(date), {
        addSuffix: true,
      });
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return ""; // Return empty string if there's an error
    }
  };

  // Check if fitness data exists and user is authenticated before rendering
  if (!fitness || !localStorage.getItem("token")) {
    return null; // Return null if fitness data is not available or user is not authenticated
  }

  return (
    <div className="fitness-details">
      <h4>{fitness.title}</h4>
      <p>Date: {formatDate(fitness.date)}</p>
      <p>Duration: {fitness.duration}</p>
      <p>Calories Burned: {fitness.caloriesBurned}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default FitnessDetails;

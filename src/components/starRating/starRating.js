import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (newRating) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "grey" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

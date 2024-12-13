import React, { useState } from "react";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRating = (value) => {
    setSelectedRating(value);
    console.log("Selected Rating:", value);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <React.Fragment key={value}>
          <input
            id={`star${value}`}
            type="radio"
            name="rating"
            value={value}
            onChange={() => handleRating(value)}
            checked={selectedRating === value}
          />
          <label htmlFor={`star${value}`}></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Rating;

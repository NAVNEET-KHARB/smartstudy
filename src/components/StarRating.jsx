import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRate, disabled = false }) => {
  const [hover, setHover] = useState(null);
  const stars = Array(5).fill(0);

  const handleRating = (value) => {
    if (!disabled && onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={32}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(null)}
            className={`cursor-pointer transition-transform duration-200 ${
              starValue <= (hover || rating) ? "text-yellow-400 scale-110" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

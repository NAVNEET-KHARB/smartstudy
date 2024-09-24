import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config.js";
import { FaStar } from 'react-icons/fa';

function PostCard({ $id, title, featuredImage, category, totalRating, numberOfRatings }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (totalRating && numberOfRatings) {
      setAverageRating((totalRating / numberOfRatings).toFixed(1)); // Calculate average rating
    }
  }, [totalRating, numberOfRatings]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <div className="w-full h-[50%] mb-4 relative overflow-hidden rounded-t-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">{title}</h2>
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500" />
            <span className="text-lg text-gray-600">
              {averageRating} / 5
            </span>
            <span className="text-sm text-gray-500">
              ({numberOfRatings || 0} reviews)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

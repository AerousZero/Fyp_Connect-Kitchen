import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function CreateReviewRating() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission of review and rating data
    console.log('Review:', review);
    console.log('Rating:', rating);
    // Reset form fields
    setReview('');
    setRating(0);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Review and Rating</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 font-bold mb-2">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Write your review..."
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="rating" className="block text-gray-700 font-bold mr-2">Rating:</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <FontAwesomeIcon
              key={value}
              icon={value <= rating ? solidStar : regularStar}
              className="text-yellow-400 cursor-pointer"
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default CreateReviewRating;

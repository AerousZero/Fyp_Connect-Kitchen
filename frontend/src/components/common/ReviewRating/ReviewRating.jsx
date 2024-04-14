import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rate } from "antd";
import "antd/dist/antd.css";

function ReviewRating() {
  const [reviewRatings, setReviewRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewRatings = async () => {
      try {
        const response = await axios.get("your-api-endpoint/review-ratings");
        setReviewRatings(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewRatings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Ratings</h2>
      {reviewRatings.map((rating) => (
        <div key={rating.id} className="mb-4">
          <Rate value={rating.rating} disabled />
          <p>Review: {rating.review}</p>
          <p>Created By: {rating.createdBy}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewRating;

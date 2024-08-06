import React, { useEffect, useState } from "react";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://cropify-deploy.onrender.com/api/v1/reviews/randomreviews"
        );
        const data = await response.json();
        console.log("review data", data.data.data);
        // data = data.data.data;
        setReviews(data.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Random Reviews</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <h2>{review.name}</h2>
              <p>{review.crop.name}</p>
              <p>
                <strong>Author:</strong> {review.author}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsPage;

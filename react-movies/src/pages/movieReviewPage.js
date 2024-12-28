import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../api/tmdb-api";

const MovieReviewPage = () => {
  const { id: rawId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = rawId && rawId.trim();  // 清理获取到的 id，确保没有空格等字符
    console.log(`Processed ID: ${id}`);  // 确认处理后的 ID

    if (id) {
      getMovieReviews(id)
        .then(data => {
          setReviews(data || []);
          setLoading(false);
        })
        .catch(err => {
          setError(`Error fetching reviews: ${err.message}`);
          setLoading(false);
        });
    } else {
      setError("Invalid movie ID.");
      setLoading(false);
    }
  }, [rawId]);  // 使用处理过的 ID

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>{review.content}</div>
      ))}
    </div>
  );
};

export default MovieReviewPage;

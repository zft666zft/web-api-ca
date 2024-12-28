import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import Spinner from "../components/spinner";
import { getMovieReviews } from "../api/tmdb-api";

const MovieReviewPage = () => {
  const { id } = useParams(); // 从 URL 获取 ID
  console.log("ID from useParams:", id); // 日志输出当前 ID 值
  const location = useLocation();

  // 从 location.state 获取 movie 数据，如果不存在则设置为 null 或默认对象
  const { movie } = location.state || { movie: null };

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getMovieReviews(id)
        .then((data) => {
          setReviews(data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Invalid movie ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!movie) {
    return <h1>Movie data is not available.</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <MovieReview key={index} review={review} />
        ))
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </PageTemplate>
  );
};

export default MovieReviewPage;

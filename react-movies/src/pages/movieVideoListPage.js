import React from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovieVideos } from '../api/tmdb-api';

const MovieVideoListPage = () => {
  const { id } = useParams(); // 获取当前电影的 ID
  const { data: videos, error, isLoading, isError } = useQuery(
    ["movieVideos", { id: id }],
    () => getMovieVideos(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movieVideos = videos.results && videos.results.length > 0 ? videos.results : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Related Videos</h2>
      {movieVideos.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {movieVideos.map((video) => (
            <li key={video.id} style={{ marginBottom: '10px' }}>
              <Link to={`/movie/${id}/video/${video.key}`} style={{ fontSize: '16px', color: '#e91e63', textDecoration: 'underline' }}>
                {video.name} ({video.type})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos available for this movie.</p>
      )}
    </div>
  );
};

export default MovieVideoListPage;

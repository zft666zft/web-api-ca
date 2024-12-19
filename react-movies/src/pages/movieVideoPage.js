import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { getMovieVideos } from '../api/tmdb-api';
import Spinner from '../components/spinner';

const MovieVideoPage = () => {
  const { id, videoKey } = useParams(); // 获取当前电影的 ID 和视频 Key

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

  // 找到与传入的 videoKey 相匹配的视频
  const video = videos.results.find(v => v.key === videoKey);

  if (!video) {
    return <h1>Video not found</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{video.name}</h2>
      <p>Type: {video.type}</p>
      <div style={{ marginTop: "20px" }}>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieVideoPage;

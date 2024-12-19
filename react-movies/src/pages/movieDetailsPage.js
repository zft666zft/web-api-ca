import React from "react";
import { useParams, Link } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';


const MoviePage = () => {
  const { id } = useParams(); // 获取当前电影的 ID
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 确定电影的海报路径，如果没有海报，则使用占位符图片
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/film-poster-placeholder.png";

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={{ ...movie, poster_path: posterUrl }}>
            <MovieDetails movie={movie} />

            {/* 新增的推荐链接 */}
            <Link to={`/movie/${id}/recommendations`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#3f51b5' }}>
              View Recommendations
            </Link>

            {/* 新增的相似电影链接 */}
            <Link to={`/movie/${id}/similar`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#388e3c', textDecoration: 'underline' }}>
              View Similar Movies
            </Link>

            {/* 新增的演员列表链接 */}
            <Link to={`/movie/${id}/cast`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#ff5722', textDecoration: 'underline' }}>
              View Cast
            </Link>

            {/* 新增的演员和制作人员链接 */}
            <Link to={`/movie/${id}/credits`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#9c27b0', textDecoration: 'underline' }}>
              View Full Credits
            </Link>

            {/* 新增的视频列表链接 */}
            <Link to={`/movie/${id}/videos`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#e91e63', textDecoration: 'underline' }}>
              View Related Videos
            </Link>
            
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;

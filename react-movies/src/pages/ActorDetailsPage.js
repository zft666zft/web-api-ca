import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import img from '../images/film-poster-placeholder.png';
import CardMedia from '@mui/material/CardMedia';


const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, error: actorError, isLoading: isActorLoading } = useQuery(
    ["actorDetails", id],
    () => getActorDetails(id)
  );

  const { data: movies, error: moviesError, isLoading: isMoviesLoading } = useQuery(
    ["actorMovies", id],
    () => getActorMovies(id)
  );

  if (isActorLoading || isMoviesLoading) return <Spinner />;
  if (actorError || moviesError) return <h1>{actorError?.message || moviesError?.message}</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{actor.name}</h2>
        <CardMedia
        sx={{ height: 450, width: 300, borderRadius: "10px", objectFit: "cover" }}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : img
        }
      />

      <div style={{ marginTop: "15px" }}>
        <h3>Biography</h3>
        <p>{actor.biography || "No biography available"}</p>

        <h3>Personal Information</h3>
        <p><strong>Known For:</strong> {actor.known_for_department}</p>
        <p><strong>Number of Movies:</strong> {movies.cast.length || "Unknown"}</p>
        <p><strong>Gender:</strong> {actor.gender === 1 ? "Female" : "Male"}</p>
        <p><strong>Birthday:</strong> {actor.birthday || "Unknown"}</p>

        <h3>Movie Credits</h3>
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {movies.cast.map((movie) => (
            <div key={movie.id} style={{ marginRight: "10px", textAlign: "center" }}>
              <CardMedia
                sx={{ height: 231, width: 154, borderRadius: "10px", objectFit: "cover" }}
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : img
                }
              />
              {/* 添加跳转到电影详情页面的链接 */}
              <Link to={`/movies/${movie.id}`} style={{ fontSize: '18px', color: '#3f51b5', textDecoration: 'none' }}>
                {movie.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetailsPage;

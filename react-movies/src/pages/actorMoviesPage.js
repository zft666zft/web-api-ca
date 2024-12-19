import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getActorMovies } from "../api/tmdb-api";

const ActorMoviesPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(["actorMovies", id], () => getActorMovies(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.cast;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movies Featuring This Actor</h2>
      {movies.length ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "15px" }}>
              <Link to={`/movies/${movie.id}`} style={{ color: "#3f51b5" }}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this actor.</p>
      )}
    </div>
  );
};

export default ActorMoviesPage;

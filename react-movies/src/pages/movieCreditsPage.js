import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovieCredits } from "../api/tmdb-api";
import img from '../images/film-poster-placeholder.png';
import CardMedia from '@mui/material/CardMedia';

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(["movieCredits", id], () => getMovieCredits(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;
  const crew = data.crew;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cast</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cast.slice(0, 10).map((actor) => (
          <li key={actor.cast_id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
            <CardMedia
              sx={{ height: 92, width: 92, borderRadius: "50%", marginRight: "15px", objectFit: "cover" }}
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                  : img
              }
            />

            <div>
              {/* 演员名字的链接，跳转到演员详情页面 */}
              <Link to={`/actor/${actor.id}/details`} style={{ fontSize: '18px', color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}>
                {actor.name}
              </Link>
              <p style={{ margin: "5px 0 0", color: "#757575" }}>as {actor.character}</p>
              {/* 演员相关电影的链接 */}
              <Link to={`/actor/${actor.id}/movies`} style={{ fontSize: '16px', color: '#0066cc', textDecoration: 'underline' }}>
                View Movies
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <h2>Crew</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {crew.slice(0, 10).map((member) => (
          <li key={member.credit_id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
            <CardMedia
              sx={{ height: 92, width: 92, borderRadius: "50%", marginRight: "15px", objectFit: "cover" }}
              image={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w92${member.profile_path}`
                  : img
              }
            />

            <div>
              {/* 制作人员名字的链接，跳转到制作人员详情页面 */}
              <Link to={`/actor/${member.id}/details`} style={{ fontSize: '18px', color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}>
                {member.name}
              </Link>
              <p style={{ margin: "5px 0 0", color: "#757575" }}>{member.job}</p>
              {/* 制作人员相关电影的链接 */}
              <Link to={`/actor/${member.id}/movies`} style={{ fontSize: '16px', color: '#0066cc', textDecoration: 'underline' }}>
                View Movies
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCreditsPage;

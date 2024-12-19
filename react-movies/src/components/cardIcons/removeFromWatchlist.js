import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext); // 使用 removeFromMustWatch

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie); // 调用正确的移除函数
  };

  return (
    <IconButton
      aria-label="remove from watchlist"
      onClick={handleRemoveFromWatchlist}
    >
      <RemoveCircleIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;

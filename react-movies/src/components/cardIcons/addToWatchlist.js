import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { MoviesContext } from "../../contexts/moviesContext";


const AddToWatchlistIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch,removeFromMustWatch } = useContext(MoviesContext);

  // 检查当前电影是否已经在 Watchlist 中
  const isInWatchlist = mustWatch.includes(movie.id);

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    if (isInWatchlist) {
      removeFromMustWatch(movie);  // 从观影清单中移除
    } else {
      addToMustWatch(movie);  // 添加到观影清单
    }
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
      {isInWatchlist ? (
        <BookmarkIcon color="primary" fontSize="large" />
      ) : (
        <BookmarkBorderIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default AddToWatchlistIcon;

import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 空心爱心图标
import FavoriteIcon from "@mui/icons-material/Favorite"; // 实心爱心图标

const AddToFavoritesIcon = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(MoviesContext);

  // 检查当前电影是否已经在收藏列表中
  const isInFavorites = favorites.includes(movie.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isInFavorites) {
      removeFromFavorites(movie);  // 从收藏列表中移除
    } else {
      addToFavorites(movie);  // 添加到收藏列表
    }
  };

  return (
    <IconButton aria-label="toggle favorite" onClick={handleToggleFavorite}>
      {isInFavorites ? (
        <FavoriteIcon color="error" fontSize="large" /> // 已收藏状态显示红色实心爱心
      ) : (
        <FavoriteBorderIcon fontSize="large" /> // 未收藏状态显示空心爱心
      )}
    </IconButton>
  );
};

export default AddToFavoritesIcon;

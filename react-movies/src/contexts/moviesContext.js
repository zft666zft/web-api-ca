import React, { useState, createContext } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); // "Must Watch" 状态变量

  // 添加到收藏列表的函数
  const addToFavorites = (movie) => {
    // 检查电影是否已存在于收藏列表中
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  // 从收藏列表中移除电影的函数
  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter(id => id !== movie.id));
  };

  // 添加到观影清单的函数
  const addToMustWatch = (movie) => {
    // 检查电影是否已存在于观影清单中
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
    }
  };

  // 从观影清单中移除电影的函数
  const removeFromMustWatch = (movie) => {
    setMustWatch((prevMustWatch) => prevMustWatch.filter(id => id !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

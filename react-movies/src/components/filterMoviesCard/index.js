import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e, newValue) => {
    handleChange(e, "rating", newValue);
  };

  const handleReleaseDateChange = (e, newValue) => {
    handleChange(e, "releaseDate", newValue);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter Movies
        </Typography>

        {/* Title Filter */}
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search by title"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Genre Filter */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rating Filter */}
        <Typography gutterBottom>Rating</Typography>
        <Slider
          value={props.ratingFilter}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          aria-labelledby="rating-slider"
        />

        {/* Release Date Filter */}
        <Typography gutterBottom>Release Year</Typography>
        <Slider
          value={props.releaseDateFilter}
          onChange={handleReleaseDateChange}
          valueLabelDisplay="auto"
          min={2000}
          max={new Date().getFullYear()}
          aria-labelledby="release-date-slider"
        />

        {/* Sort Option */}
        <FormControl sx={{ ...formControl, marginTop: 2 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
          </Select>
        </FormControl>
        
      </CardContent>

      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}

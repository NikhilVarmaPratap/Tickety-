import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ bgcolor: '#141414', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h4"  textAlign={"center"} bgcolor='gold' color="black" gutterBottom
        sx={{
          fontWeight: 'bold', // Makes it closer to Netflix Sans in appearance
          letterSpacing: 'normal', // Standard letter spacing
          marginBottom: 3
        }}>
        All Movies
      </Typography>
      <Grid container spacing={2} padding={2}>
        {movies && movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MovieItem
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Movies;

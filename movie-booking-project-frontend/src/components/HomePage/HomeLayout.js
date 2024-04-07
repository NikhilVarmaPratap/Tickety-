import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../../helpers/api-helpers';
import CardLayout from './CardLayout';

const HomeLayout = () => {
  const [movies, setMovies] = useState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Box
        sx={{
          margin: 'auto',
          width: '100%',
          height: '40%',
          padding: 2,
          backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%), url("https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg")',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Typography variant={matches ? 'h2' : 'h4'} textAlign={'center'} color="white">
          Featured Movie: Rocketry
        </Typography>
      </Box>
      <Box padding={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Latest Releases
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        margin="auto"
        width="80%"
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <CardLayout
              id={movie._id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              description={movie.description}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" justifyContent="center" padding={5}>
        <Button
          variant="contained"
          component={Link}
          to="/movies"
          sx={{ bgcolor: '#E50914', '&:hover': { bgcolor: '#db0510' }, color: 'white' }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;

import { Button, Card, CardActions, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CardLayout = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures that the action button stays at the bottom
        position: 'relative', // Necessary for overlay positioning
        borderRadius: 2, // More aligned with Netflix's card corners
        overflow: 'hidden', // Prevents content from spilling outside the border radius
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ":hover": {
          transform: 'scale(1.05)', // Adds a subtle zoom effect on hover
          boxShadow: "0px 0px 20px #000", // Shadow more pronounced
          zIndex: 2, // Ensure the card pops out over others
        },
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition for zoom and shadow
      }}
    >
      {/* Overlay container with the movie title and release date */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%', 
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0))',
          padding: '16px',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
          noWrap
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#f0f0f0', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
        >
          {new Date(releaseDate).toDateString()}
        </Typography>
      </Box>

      {/* Action area */}
      <CardActions sx={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <Button
          component={Link}
          to={`/booking/${id}`}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "rgba(255, 0, 0, 0.7)", // Using Netflix's iconic red with some transparency
            "&:hover": {
              bgcolor: "rgba(255, 0, 0, 1)",
            },
            color: "white",
            fontWeight: 'bold'
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLayout;

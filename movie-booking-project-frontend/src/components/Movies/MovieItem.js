import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 2, // Netflix-style card corners
        overflow: 'hidden', // Ensures the image fully covers the card area
        ":hover": {
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)", // Enhanced shadow effect on hover
          transform: "scale(1.03)", // Slight enlargement effect on hover
        },
        transition: "transform 0.3s ease, boxShadow 0.3s ease", // Smooth transitions
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Keeps the button at the bottom
        backgroundColor: "#121212", // Dark theme background
      }}
    >
      <img
        style={{
          height: "60%",
          width: "100%",
          objectFit: "cover",
        }}
        src={posterUrl}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, color: "white" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{
            fontWeight: 700, // Bold text for the title
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Ensuring Roboto is used, fallbacks included
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          {new Date(releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{
            background: "linear-gradient(145deg, #ffd700, #cdaa00)",
            color: "black",
            fontWeight: 'bold',
            '&:hover': {
              background: "linear-gradient(145deg, #ffe033, #b8860b)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            },
            transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;

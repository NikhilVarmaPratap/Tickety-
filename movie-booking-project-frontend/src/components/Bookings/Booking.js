import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ backgroundColor: "#141414", color: "white", minHeight: "100vh", pt: 4 }}>
      {movie && (
        <Fragment>
          <Typography variant="h4" textAlign="center" color="gold" gutterBottom
                    sx={{
                      fontWeight: 700,
                      fontFamily: "Helvetica",
                    }}>
            Book Tickets for "{movie.title}"
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            <Box width="100%" maxWidth={500} p={2}>
              <img
                width="100%"
                src={movie.posterUrl}
                alt={movie.title}
                style={{ borderRadius: "4px" }}
              />
              <Typography pt={2}>{movie.description}</Typography>
              <Typography fontWeight="bold" mt={1}>
                Starrer: {movie.actors.join(", ")}
              </Typography>
              <Typography fontWeight="bold" mt={1}>
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box width="100%" maxWidth={500} p={2}>
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <FormLabel sx={{ color: "white" }}>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      sx: { color: "white" },
                    }}
                    sx={{ input: { color: "white" }, borderColor: "white", "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "red" } }}
                  />
                  <FormLabel sx={{ color: "white", mt: 2 }}>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    value={inputs.date}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      sx: { color: "white" },
                    }}
                    sx={{ input: { color: "white" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "red" } }}
                  />
                  <Button type="submit" variant="contained" sx={{
                    mt:3,
            background: "linear-gradient(145deg, #ffd700, #cdaa00)",
            color: "black",
            fontWeight: 'bold',
            '&:hover': {
              background: "linear-gradient(145deg, #ffe033, #b8860b)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            },
            transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Booking;

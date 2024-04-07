import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteBooking, getUserBooking, getUserDetails } from "../api-helpers/api-helpers";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings((currentBookings) => currentBookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      width={"100%"}
      bgcolor="#141414"
      color="white"
      py={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{
        fontFamily: 'Arial, sans-serif', // This is a common, clean sans-serif font.
      }}
    >
      {user && (
        <Box
          sx={{
            bgcolor: "#252525",
            p: 3,
            borderRadius: 2,
            width: "100%",
            maxWidth: 600,
            textAlign: 'center',
            mb: 3
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "10rem", color: "gold" }} />
          <Typography sx={{ mt: 2, fontSize: "1.2rem", fontWeight: 'bold' }}>
            Name: {user.name}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "1.2rem" }}>
            Email: {user.email}
          </Typography>
        </Box>
      )}

      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: 'bold', // Makes it closer to Netflix Sans in appearance
          letterSpacing: 'normal', // Standard letter spacing
          marginBottom: 3
        }}
      >
        My Bookings
      </Typography>

      {bookings.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 600, bgcolor: "#141414" }}>
          {bookings.map((booking, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "#252525",
                my: 1,
                borderRadius: 2,
                ":hover": {
                  bgcolor: "#303030",
                },
                transition: "background-color 0.3s",
              }}
            >
              <ListItemText
                primary={`Movie: ${booking.movie.title}`}
                sx={{ pr: 2, fontWeight: 'bold' }}
              />
              <ListItemText
                primary={`Seat: ${booking.seatNumber}`}
                sx={{ fontWeight: 'bold' }}
              />
              <ListItemText
                primary={`Date: ${new Date(booking.date).toLocaleDateString()}`}
                sx={{ fontWeight: 'bold' }}
              />
              <IconButton
                onClick={() => handleDelete(booking._id)}
                sx={{ "&:hover": { color: "#e50914" }, color: "white" }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ color: "#999", fontWeight: 'bold' }}>No bookings available.</Typography>
      )}
    </Box>
  );
};

export default UserProfile;

import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
const AdminProfile = () => {
  const [admin, setAdmim] = useState(); // Note: Consider renaming to `setAdmin` for consistency in a real-world application

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmim(res.admin);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" display={"flex"} bgcolor="#141414" color="white" py={4} flexDirection="column" alignItems="center" minHeight="100vh">
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
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
        <Typography
          sx={{ mt: 2, fontSize: "1.2rem", fontWeight: 'bold' }}
        >
          Email: {admin && admin.email}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2} sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Added Movies
        </Typography>
        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin &&
              admin.addedMovies.map((movie, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#252525",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                    borderRadius: 2,
                    ":hover": {
                      bgcolor: "#303030",
                    },
                    transition: "background-color 0.3s",
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left", fontWeight: 'bold' }}
                  >
                    Movie: {movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left", fontWeight: 'bold' }}
                  >
                    Releasing: {new Date(movie.releaseDate).toLocaleDateString()}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { getAdmidData } from "../../helpers/api-helpers";

const Admin = () => {
  const [admin, setAdmin] = useState();
  
  useEffect(() => {
    getAdmidData()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" display="flex" bgcolor="#141414" color="white">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="30%"
        sx={{
          padding: 3,
        }}
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem", color: "#E50914" }} />
        <Typography
          sx={{
            padding: 1,
            width: "200px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: 2,
            bgcolor: "#2b2d42",
            color: "white",
            mt: 2,
          }}
        >
          Email: {admin && admin.email}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection="column">
        <Typography
          variant="h3"
          textAlign="center"
          padding={2}
          sx={{ color: "#E50914", fontFamily: "verdana" }}
        >
          Added Movies
        </Typography>

        <Box margin="auto" display="flex" flexDirection="column" width="80%" sx={{ bgcolor: "#141414" }}>
          <List>
            {admin &&
              admin.addedMovies.map((movie, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#333",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                    borderRadius: 2,
                    ':hover': {
                      bgcolor: "#484848",
                    }
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, textAlign: "left" }}
                  >
                    Movie: {movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, textAlign: "left" }}
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

export default Admin;

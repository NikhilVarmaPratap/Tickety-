import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  // Define labelStyle here
  const labelStyle = { mt: 1, mb: 1, color: 'white' }; // Updated with color for better visibility on dark background

  return (
    <Dialog open={true} PaperProps={{ style: { borderRadius: 20, backgroundColor: '#141414', color: 'white' } }}>
      <IconButton
        LinkComponent={Link}
        to="/"
        sx={{ color: 'white', position: 'absolute', right: 8, top: 8 }}
      >
        <CloseRoundedIcon />
      </IconButton>
      <Typography variant="h4" textAlign={"center"} sx={{ paddingTop: 3, color: 'white' }}>
        {isSignup ? "Sign Up" : "Log In"}
      </Typography>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            padding={3}
            display={"flex"}
            flexDirection="column"
            width={"auto"}
            margin="auto"
          >
            {isSignup && !isAdmin && (
              <>
                <FormLabel sx={labelStyle}>Name</FormLabel>
                <TextField
                  value={inputs.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="name"
                  fullWidth
                  InputProps={{
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
              </>
            )}
            <FormLabel sx={labelStyle}>Email</FormLabel>
            <TextField
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="email"
              name="email"
              fullWidth
              InputProps={{
                sx: {
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <FormLabel sx={labelStyle}>Password</FormLabel>
            <TextField
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="password"
              name="password"
              fullWidth
              InputProps={{
                sx: {
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
            {!isAdmin && (
              <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{
                  mt: 1,
                  color: 'gold',
                  '&:hover': {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
                fullWidth
              >
                Switch to {isSignup ? "Log In" : "Sign Up"}
              </Button>
            )}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;

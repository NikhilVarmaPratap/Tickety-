import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../helpers/api-helpers"; // Assume this exists
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/admin-slice"; // Assume this exists

const AdminAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const onClose = () => {
    setOpen(false);
    navigate(-1); // Navigate back
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRequestSent = (val) => {
    localStorage.setItem("adminId", val.id);
    localStorage.setItem("token", val.token);
    dispatch(adminActions.login());
    setOpen(false);
    navigate("/admin/dashboard"); // Adjust according to your route
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin(inputs)
      .then(onRequestSent)
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "#141414",
          color: "white",
          borderRadius: 2,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          color: "white",
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
      <DialogTitle sx={{ textAlign: "center" }}>Admin Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="dense"
            placeholder="Email"
            InputProps={{
              sx: {
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: "white",
                },
              },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            placeholder="Password"
            InputProps={{
              sx: {
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: "white",
                },
              },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "error.main",
              '&:hover': {
                bgcolor: "error.dark",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default AdminAuth;

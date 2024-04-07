import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(null);
  const [movies, setMovies] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    getAllMovies()
      .then((res) => setMovies(res.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    if (isAdminLoggedIn) {
      dispatch(adminActions.logout());
    } else {
      dispatch(userActions.logout());
    }
    navigate('/');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAutocompleteChange = (event, val) => {
    const movie = movies.find((m) => m.title === val);
    if (movie && isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1f1f1f" }}>
      <Toolbar>
        <Box display="flex" alignItems="center" width={isMobile ? "100%" : "auto"}>
          <IconButton LinkComponent={Link} to="/" sx={{ color: "gold" }}>
            <MovieIcon />
          </IconButton>
          {!isMobile && (
            <Autocomplete
              onChange={handleAutocompleteChange}
              freeSolo
              options={movies.map((option) => option.title)}
              sx={{ width: 300, ".MuiAutocomplete-inputRoot": { color: "gold" } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Movies"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    style: { color: "gold" }
                  }}
                  variant="standard"
                />
              )}
            />
          )}
        </Box>
        {!isMobile && (
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              sx={{ '.MuiTabs-indicator': { backgroundColor: 'gold' } }}
            >
              <Tab label="Movies" LinkComponent={Link} to="/movies" />
              {!isAdminLoggedIn && !isUserLoggedIn && (
                <>
                  <Tab label="Admin" LinkComponent={Link} to="/admin" />
                  <Tab label="Auth" LinkComponent={Link} to="/auth" />
                </>
              )}
              {isUserLoggedIn && (
                <>
                  <Tab label="Profile" LinkComponent={Link} to="/user" />
                  <Tab label="Logout" onClick={logout} />
                </>
              )}
              {isAdminLoggedIn && (
                <>
                  <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                  <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                  <Tab label="Logout" onClick={logout} />
                </>
              )}
            </Tabs>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

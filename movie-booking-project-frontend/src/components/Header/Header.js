import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../../helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAutocompleteChange = (event, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    if (movie && isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1f1f1f" }}>
      <Toolbar>
        <Box display="flex" alignItems="center" width={isMobile ? "100%" : "auto"}>
          <Link to="/" style={{ color: "gold", display: "flex", alignItems: "center" }}>
            <MovieCreationIcon sx={{ mr: 1 }} />
            {!isMobile && <Typography variant="h6" noWrap component="div">
              Cinema Gold
            </Typography>}
          </Link>
        </Box>
        {!isMobile && (
          <Box flexGrow={1} mx="auto">
            <Autocomplete
              onChange={handleAutocompleteChange}
              sx={{ borderRadius: 10, bgcolor: "rgba(255, 215, 0, 0.15)", width: "100%", maxWidth: '700px' }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Search Across Multiple Movies"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    style: { color: 'white' }
                  }}
                  sx={{
                    '& .MuiInput-root': {
                      color: 'gold',
                      width: '100%',
                    },
                  }}
                />
              )}
            />
          </Box>
        )}
        <Box>
          <Tabs
            onChange={handleChange}
            value={value}
            textColor="inherit"
            sx={{ '.MuiTabs-indicator': { backgroundColor: 'gold' } }}
          >
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Auth" to="/auth" LinkComponent={NavLink} />
                <Tab label="Admin" to="/admin" LinkComponent={NavLink} />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="User" to="/user" LinkComponent={Link} />
                <Tab label="Logout" onClick={() => dispatch(userActions.logout())} to="/" LinkComponent={Link} />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Profile" to="/profile" LinkComponent={Link} />
                <Tab label="Add Movie" to="/add" LinkComponent={Link} />
                <Tab label="Logout" onClick={() => dispatch(adminActions.logout())} to="/" LinkComponent={Link} />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

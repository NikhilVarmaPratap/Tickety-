import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleActorChange = (e) => setActor(e.target.value);

  const handleActorAdd = () => {
    if (actor && !actors.includes(actor)) {
      setActors((prevActors) => [...prevActors, actor]);
      setActor(""); // Clear the input after adding
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ ...inputs, actors })
      .then((res) => console.log("Movie added:", res))
      .catch((err) => console.log("Error adding movie:", err));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "50%",
        padding: 5,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#141414",
        color: "white",
        boxShadow: "10px 10px 20px #333",
        borderRadius: 2,
      }}
    >
      <Typography
        textAlign={"center"}
        variant="h5"
        sx={{ color: "gold", marginBottom: 2 }}
      >
        Add New Movie
      </Typography>
      
      <TextField
        label="Title"
        value={inputs.title}
        onChange={handleChange}
        name="title"
        variant="filled"
        margin="normal"
        fullWidth
        sx={{ input: { color: 'white' }, bgcolor: "#333", borderRadius: 5 }}
      />
      <TextField
        label="Description"
        value={inputs.description}
        onChange={handleChange}
        name="description"
        multiline
        rows={4}
        variant="filled"
        margin="normal"
        fullWidth
        sx={{ input: { color: 'white' }, bgcolor: "#333", borderRadius: 5}}
      />
      <TextField
        label="Poster URL"
        value={inputs.posterUrl}
        onChange={handleChange}
        name="posterUrl"
        variant="filled"
        margin="normal"
        fullWidth
        sx={{ input: { color: 'white' }, bgcolor: "#333", borderRadius: 5 }}
      />
      <TextField
        label="Release Date"
        type="date"
        value={inputs.releaseDate}
        onChange={handleChange}
        name="releaseDate"
        variant="filled"
        margin="normal"
        fullWidth
        sx={{ input: { color: 'white' }, bgcolor: "#333", borderRadius: 5, '.MuiInputBase-input': { color: 'white' } }}
        InputLabelProps={{
          shrink: true,
          style: { color: 'white' },
        }}
      />
      
      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField
          label="Actor"
          value={actor}
          onChange={handleActorChange}
          variant="filled"
          margin="normal"
          sx={{ input: { color: 'white' }, bgcolor: "#333", borderRadius: 5, flexGrow: 1 }}
        />
        <Button
          onClick={handleActorAdd}
          sx={{ marginLeft: 2, bgcolor: "gold", '&:hover': { bgcolor: "#f40612" }, color: "black" }}
        >
          Add
        </Button>
      </Box>

      <Box marginTop={2} display="flex" alignItems="center">
        <Checkbox
          name="featured"
          checked={inputs.featured}
          onChange={handleChange}
          sx={{ color: 'white', '&.Mui-checked': { color: 'gold' }, padding: 0 }}
        />
        <Typography variant="body1" marginLeft={2}>
          Featured
        </Typography>
      </Box>
      
      <Button
        type="submit"
        variant="contained"
            sx={{
              mt:3,
            background: "linear-gradient(145deg, #ffd700, #cdaa00)",
            color: "black",
            fontWeight: 'bold',
            '&:hover': {
              background: "linear-gradient(145deg, #ffe033, #b8860b)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            },
            transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            alignSelf: "center",
          width: "fit-content",
          }}

      >
        Add New Movie
      </Button>
    </Box>
  );
};

export default AddMovie;

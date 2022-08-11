import React, { useEffect, useState } from "react";
import "./Collections.scss";
import Box from "@mui/material/Box";
import FileBase64 from "react-file-base64";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  Badge,
} from "@mui/material";
import useInput from "../../hooks/use-input";

const options = ["Digital", "Physical"];

const Collections = () => {
  const [file, setFile] = useState("");
  const [arts, setArts] = useState([]);
  const [type, setType] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const {
    value: title,
    hasError: titleHasError,
    isValid: titleIsValid,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "");
  const {
    value: description,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "");

  const {
    value: price,
    hasError: priceHasError,
    isValid: priceIsValid,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput((value) => value.trim() !== "");

  const formIsValid =
    titleIsValid && priceIsValid && descriptionIsValid && file !== "";

  const artDetails = {
    title: title,
    price: price,
    description: description,
    image: file,
    type: type,
  };

  const artsHTTP = async () => {
    await fetch("http://localhost:3001/arts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artDetails),
    }).catch((err) => console.error(err));
  };

  const fetchArts = async () => {
    const response = await fetch("http://localhost:3001/arts");
    const data = await response.json();
    console.log(data);
    setArts(data);
  };

  useEffect(() => {
    fetchArts();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(file);
    artsHTTP();
    resetTitle();
    resetPrice();
    resetDescription();
    setFile("");
    fetchArts();
  };

  return (
    <Box className="collections" sx={{ my: "100px" }}>
      <Box>
        <h2>
          Add New Art
          <Divider />
        </h2>
        <form onSubmit={onSubmitHandler}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
              >
                Title
              </InputLabel>
              <OutlinedInput
                size="small"
                fullWidth
                sx={{ mb: "20px", py: "3px" }}
                error={titleHasError}
                placeholder="Enter Title"
                value={title}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
              >
                Price
              </InputLabel>
              <OutlinedInput
                size="small"
                fullWidth
                sx={{ mb: "20px", py: "3px" }}
                startAdornment={
                  <InputAdornment position="start">Rs</InputAdornment>
                }
                type="number"
                error={priceHasError}
                placeholder="Enter Price"
                value={price}
                onChange={priceChangeHandler}
                onBlur={priceBlurHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
              >
                Type
              </InputLabel>
              <Autocomplete
                sx={{ p: "0" }}
                value={type}
                onChange={(event, newValue) => {
                  setType(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={options}
                renderInput={(params) => (
                  <Box ref={params.InputProps.ref}>
                    <OutlinedInput
                      size="small"
                      fullWidth
                      {...params.inputProps}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
              >
                Description
              </InputLabel>
              <OutlinedInput
                size="small"
                fullWidth
                sx={{ mb: "20px", py: "3px" }}
                error={descriptionHasError}
                multiline
                rows={4}
                placeholder="Enter Description"
                value={description}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Upload Art</InputLabel>
              <FileBase64
                type="file"
                multiple={false}
                name="image"
                onDone={({ base64 }) => setFile(base64)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{
              mt: "20px",
              textTransform: "capitalize",
              fontWeight: "bold",
              backgroundColor: "#496BD6",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#496BD6",
                boxShadow: "none",
              },
            }}
            disabled={!formIsValid}
            variant="contained"
          >
            Submit
          </Button>
        </form>
        <Box>
          <h2>
            All Arts
            <Divider />
          </h2>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {arts.map((item) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", mx: 2, my: 1 }}>
                      Rs. {item.price}
                    </Typography>
                    {item.type && (
                      <Badge
                        sx={{ mr: "40px" }}
                        color="secondary"
                        badgeContent={item.type}
                      ></Badge>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Collections;

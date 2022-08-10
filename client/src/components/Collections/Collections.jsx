import React, { useState } from "react";
import "./Collections.scss";
import Box from "@mui/material/Box";
import FileBase64 from "react-file-base64";
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import useInput from "../../hooks/use-input";
const Collections = () => {
  const [file, setFile] = useState("");

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
  };

  const artsHTTP = async () => {
    await fetch("http://localhost:3001/arts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artDetails),
    }).catch((err) => console.error(err));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(file);
    artsHTTP();
    resetTitle();
    resetPrice();
    resetDescription();
    setFile("");
  };

  return (
    <Box className="collections">
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
            <Grid item xs={6}>
              <InputLabel>Title</InputLabel>
              <OutlinedInput
                error={titleHasError}
                placeholder="Enter Title"
                value={title}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Price</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">Rs</InputAdornment>
                }
                type="number"
                error={priceHasError}
                placeholder="Enter Price"
                value={price}
                onChange={priceChangeHandler}
                onBlur={priceBlurHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Description</InputLabel>
              <OutlinedInput
                error={descriptionHasError}
                multiline
                rows={4}
                placeholder="Enter Description"
                value={description}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
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
            sx={{ mt: "20px" }}
            disabled={!formIsValid}
            variant="contained"
          >
            Submit
          </Button>
        </form>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Collections;

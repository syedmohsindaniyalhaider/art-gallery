import { useState, useEffect } from "react";
import "./Home.scss";
import Box from "@mui/material/Box";
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
const Home = () => {
  const [arts, setArts] = useState([]);

  const fetchArts = async () => {
    try {
      const response = await fetch("http://localhost:3001/arts");
      const data = await response.json();
      setArts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArts();
  }, [arts]);
  return (
    <Box>
      <h2>
        All Arts
        <Divider />
      </h2>
      <Container maxWidth="md" sx={{ mb: "40px" }}>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {arts.map((ele) => (
            <Grid item xs={12} sm={6} key={ele.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image={ele.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ele.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ele.description}
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
                    Rs. {ele.price}
                  </Typography>
                  {ele.type && (
                    <Badge
                      sx={{ mr: "40px" }}
                      color="secondary"
                      badgeContent={ele.type}
                    ></Badge>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.scss";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Main = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Box
        sx={{
          minHeight: "100vh",
          marginTop: "100px",
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Main;

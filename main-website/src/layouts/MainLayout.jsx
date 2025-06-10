import React from "react";
import { Box, Container } from "@mui/material";
// import Navbar from "../components/Navbar"; // Remove this import
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <Box>
    <Header />
    {/* The Navbar is now rendered within the Header component */}
    <Container sx={{ minHeight: "80vh", mt: 2 }}>
      <Outlet />
    </Container>
    <Footer />
  </Box>
);

export default MainLayout;

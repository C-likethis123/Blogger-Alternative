import React from "react";
import { Container } from "reactstrap";
import Features from "./Features";
import SplashPage from "./SplashPage";
import Login from "./Login";

function HomePage() {
  return (
    <Container>
      <SplashPage />
      <Features />
      <Login />
    </Container>
  );
}

export default HomePage;

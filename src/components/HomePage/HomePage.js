import React from "react";
import { Container } from "reactstrap";
import Features from "./Features";
import SplashPage from "./SplashPage";

function HomePage() {
  return (
    <Container>
      <SplashPage />
      <Features />
    </Container>
  );
}

export default HomePage;

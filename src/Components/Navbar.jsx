import React from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';

const Navigation = () => {
  return (
    <Navbar color="dark" dark expand="md" className="mb-4">
      <Container>
        <NavbarBrand href="/">🎬 Kinoplatforma</NavbarBrand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
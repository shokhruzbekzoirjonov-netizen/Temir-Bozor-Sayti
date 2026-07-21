import React from 'react';
import { Container } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <Container>
        <p className="m-0">&copy; {new Date().getFullYear()} Kinoplatforma. Barcha huquqlar hamkorlikda saqlanadi.</p>
      </Container>
    </footer>
  );
};

export default Footer;
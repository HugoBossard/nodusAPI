import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
   <Container className=''>
      <Navbar className="nav justify-content-center">
          <Navbar.Brand as={Link} to="/" className='colorNav mr-auto'>Accueil</Navbar.Brand>
            <Nav>
              {/* <Nav.Link as={Link} to="/Visualisation" assName='colorNav'>Visualisation</Nav.Link> */}
            </Nav>
      </Navbar>  
    </Container>
  );
}

export default NavbarComponent;


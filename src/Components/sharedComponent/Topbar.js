import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Topbar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          Bloggers Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate("/users")}>Profile</Nav.Link>
            <NavDropdown title="Blogs" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/blogs")}>
                Blog
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/blogs/categories")}>
                Categories
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link
              onClick={() => {
                localStorage.removeItem("login-token");
                // console.log(localStorage.getItem("login-token"));
                // navigate("/login");
              }}
            >
              Logout
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;

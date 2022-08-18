import { Link } from "react-router-dom";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../context/UserProvider";

function MyNavbar() {
  const { basketCount, searchWord, setSearchWord, getKnitProducts } =
    React.useContext(UserContext);

  React.useEffect(() => {
    getKnitProducts();
  }, [searchWord]);

  return (
    <Navbar bg="primary" expand="lg">
      <Container fluid>
        <Link className="logo" to="/">
          Узелок
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="menu-navbar" to="/">
              Каталог всех работ
            </Link>

            <Link className="menu-navbar" to="/admin/add">
              Добавить вязанный товар
            </Link>

            <Link className="menu-navbar" to="/admin">
              Aдмин панель
            </Link>

            <Link className="menu-navbar" to="/link">
              Уроки рукоделья
            </Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Поиск"
              className="me-2"
              aria-label="Search"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />

            <Button variant="outline-secondary">Поиск</Button>
          </Form>
          <Link to="/basket">
            <IconButton>
              <Badge badgeContent={basketCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

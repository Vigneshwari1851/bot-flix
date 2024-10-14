import React from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import { Link, useNavigate } from "react-router-dom";
import { IconNames } from "@blueprintjs/icons";

interface HeaderProps {
  title: string;
  showBackButton?: boolean; 
  showSearchButton?: boolean; 
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton,
  showSearchButton,
}) => {
  const navigate = useNavigate();

  return (
    <Navbar className="bp4-dark" style={{ backgroundColor: "#2c3e50" }}>
      <Navbar.Group align={Alignment.LEFT}>
        {showBackButton && (
          <Button
            icon={IconNames.ARROW_LEFT}
            minimal
            onClick={() => navigate(-1)} 
            style={{ marginRight: "10px" }}
            aria-label="Go back"
          />
        )}
        <Navbar.Heading style={{ color: "white" }}>{title}</Navbar.Heading>
      </Navbar.Group>
      {showSearchButton && (
        <Navbar.Group align={Alignment.RIGHT}>
          <Link to="/search">
            <Button
              icon={IconNames.SEARCH}
              intent="primary"
              style={{ marginLeft: "10px", background: "#2c3e50" }}
              aria-label="Search movies"
            >
              Search
            </Button>
          </Link>
        </Navbar.Group>
      )}
    </Navbar>
  );
};

export default Header;

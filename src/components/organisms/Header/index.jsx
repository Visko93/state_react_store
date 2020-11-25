import React from "react";
import { NavLink, Link } from "react-router-dom";

const isActiveStyle = {
  color: "navy",
  fontWeight: "bold",
};

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink activeStyle={isActiveStyle} to="/shoes">
              Doces
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={isActiveStyle} to="/cart">
              Carrinho
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

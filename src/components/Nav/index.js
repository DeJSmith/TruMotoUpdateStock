import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/TruMotoLogo.png";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <a className="navbar-brand" href="#">
        <img src={Logo} width="300" height="80" alt="" />
      </a>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/stock" className="nav-item nav-link">
            Update Stock
          </Link>
          <Link to="/product" className="nav-item nav-link">
            Update Products
          </Link>
        </div>
      </div>
    </nav>
  );
}

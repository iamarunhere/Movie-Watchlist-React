import React, { useState } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [links, setlinks] = useState("home");
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h3>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Movie <FontAwesomeIcon icon={faFilm} />
              <span> </span>Watchlist
            </Link>
          </h3>
        </div>

        <div className="nav-links">
          <ul className="menu">
            <li
              onClick={() => {
                setlinks("Watchlist");
                navigate("/");
              }}
              className={links === "Watchlist" ? "active" : ""}
            >
              <button>Watchlist</button>
            </li>
            <li
              onClick={() => {
                navigate("/addmovie");
                setlinks("Add Movies");
              }}
              className={links === "Add Movies" ? "active" : ""}
            >
              <button> Add Movies</button>
            </li>
          </ul>
        </div>
      </div>
      <hr className="hrline" />
    </>
  );
};

export default Navbar;

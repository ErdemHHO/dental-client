import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import * as actionType from "../constants/actionTypes.js";

function Navbar() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.user
  );
  console.log(user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate("/signin");

    setUser(null);
  };

  return (
    <div>
      <nav
        id="h-navbar"
        className="navbar navbar-expand-lg navbar-dark bg-danger p-3 mx-3 mb-1"
      >
        <div className="container-fluid">
          <img className="Nteethgif" src="/img/teeth.gif" alt="gif"></img>
          <a className="navbar-brand" href="/homepage">
            <h3>DİŞ SAĞLIĞI</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Diş Sağlık Durumum Nasıl ?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all-query">
                  Önceki Sağlık Raporlarım
                </a>
              </li>
            </ul>
            <span className="navbar-text">
              <ul>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle navbar-name "
                    data-bs-toggle="dropdown"
                    href="/homepage"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user ? (
                      <span className="navbar-name">{user?.name}</span>
                    ) : (
                      <Link
                        className="dropdown-item text-black dhover"
                        to="/signin"
                      >
                        {" "}
                        Giris Yap{" "}
                      </Link>
                    )}
                  </a>
                  <div className="dropdown-menu onOff ">
                    <a
                      className="dropdown-item text-black dhove onOffr"
                      href="/homepage"
                    >
                      Profil Bilgilerim
                    </a>
                    <div className="dropdown-divider text-black dhover onOff"></div>
                    <a
                      className="dropdown-item text-black dhover onOff"
                      href="/signin"
                      onClick={logout}
                    >
                      Cikis
                    </a>
                  </div>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

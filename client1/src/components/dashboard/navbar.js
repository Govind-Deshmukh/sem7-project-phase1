import React from "react";
import { Link } from "react-router-dom";
import "../auth/navbar.css";
import swal from "sweetalert";

export default function navbar() {
  // logout function
  const logout = () => {
    localStorage.clear().then(() => {
      swal("Success", "Logged out successfully", "success").then(() => {
        window.location.href = "/";
      });
    });
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand m-1" href="/">
            MGM's CRM Tool
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item active m-2">
                <Link class="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li class="nav-item active m-2">
                <Link class="nav-link" to="/dashboard/profile">
                  Profile
                </Link>
              </li>
              <li class="nav-item active m-2">
                <Link class="nav-link" to="/dashboard/segments">
                  Configure Segments
                </Link>
              </li>
              <li class="nav-item active m-2">
                <Link class="nav-link" to="/dashboard/smtpconfig">
                  Configure SMTP
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <button class="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

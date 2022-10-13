import * as React from "react";
import "./style.css";
export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">
        MGM Email Marketing App
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/">
              Link
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/">
              Disabled
            </a>
          </li>
        </ul>
        <div class="my-2 my-lg-0">
          <button class="btn btn-warning my-2 my-sm-0" type="submit">
            Something
          </button>
        </div>
      </div>
    </nav>
  );
}

import * as React from "react";

import "../assets/style/cards.css";

import axios from "axios";

import swal from "sweetalert";

import { useState } from "react";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/login";
    const artical = {
      username,
      password,
    };
    console.log(artical);
    try {
      await axios.post(url, artical).then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        window.location.href = "/dashboard";
      });
    } catch (error) {
      swal("Login Failed", "Username or Password enterred is Invalid", "error");
    }
  };

  return (
    <div className="card shadow-lg">
      <img
        className="card-img-top"
        src={require("../assets/images/LoginRegisterCardBg.jpg")}
        alt="bgimage"
      />
      <div className="card-body">
        <h5 className="card-title text-center">Login User</h5>
        <div className="w-100">
          <div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>
            <button
              type="submit"
              onClick={handleClick}
              className="btn btn-primary w-100 mb-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

import { useEffect } from "react";

import swal from "sweetalert";

import axios from "axios";

export default function Dashboard() {
  // logout btn handler
  const logoutClick = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "/";
  };
  // only allow access to this page if the user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    if (token === null) {
      swal("Login Required", "Please Login to Continue", "error");
      window.location.href = "/";
    } else {
      try {
        axios
          .post("http://localhost:8090/auth/verify", { token, username })
          .then((res) => {
            console.log(res.data);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("loggedIn", true);
          });
      } catch (error) {
        swal(
          "Login Failed",
          "Username or Password enterred is Invalid",
          "error"
        );
        sessionStorage.clear();
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>Dashboard</h1>
      </div>
      <div className="container">
        <button onClick={logoutClick}>Logout</button>
      </div>
    </>
  );
}

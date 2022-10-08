import * as React from "react";

import "../assets/style/cards.css";

import axios from "axios";

import swal from "sweetalert";

import { useState } from "react";

export default function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/register";
    const artical = {
      name,
      email,
      contact,
      username,
      password,
      confpassword,
    };
    console.log(artical);

    if (confpassword === password) {
      try {
        await axios.post(url, artical).then((res) => {
          console.log(res.data.message);

          window.location.href = "/";
        });
      } catch (error) {
        swal(
          "Login Failed",
          "Username or Password enterred is Invalid",
          "error"
        );
      }
    } else {
      swal(
        "Registeration Failed",
        "Password and COnfirm password do not match",
        "error"
      );
    }
  };

  return (
    <div className="card shadow-lg">
      <img
        className="card-img-top"
        src={require("../assets/images/LoginRegisterCardBg.jpg")}
        alt="bgimage"
      />
      <div className="card-body ">
        <h5 className="card-title text-center">Register User</h5>
        <div className="w-100">
          <form method="post" action="localhost:8090/register">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                name="name"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact No</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setContact(e.target.value)}
                name="contact"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Create Username</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Create Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfPassword(e.target.value)}
                name="confpassword"
              />
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="btn btn-primary w-100 mb-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import swal from "sweetalert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ConfPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log("register");
    if (password !== ConfPassword) {
      swal("Password not matched", "Please enter same password", "error");
    } else {
      try {
        const artical = {
          name: name,
          email: email,
          password: password,
        };

        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artical),
        });
        const data = await response.json();
        if (data.error) {
          swal("Error", "Please enter valid data", "error");
        } else {
          swal("Success", "Register successfully", "success");
          //   set local storege
          localStorage.setItem("token", data.token);
          localStorage.setItem("data", JSON.stringify(data));
        }
      } catch (error) {
        swal("Error", "Please enter valid data", "error");
      }
    }
  };
  return (
    <div>
      <div class="card">
        <div class="card-header text-center">
          <h3>Register</h3>
        </div>
        <div class="card-body">
          <form onSubmit={register}>
            <div class="mb-3">
              <label>Full name</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                class="form-control"
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

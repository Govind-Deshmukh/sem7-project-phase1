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
        console.log(artical);
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(artical),
        });
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          swal("Error", "Please enter valid data", "error");
        } else {
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            window.location.href = "/";
          });
        }
      } catch (error) {
        swal("Error", "Please enter valid data", "error");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6 mb-3">
        <div class="card border border-dark rounded">
          <div class="card-header text-center bg-dark text-white">
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
              <div className="text-center">
                <button type="submit" class="btn btn-info w-50 ">
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

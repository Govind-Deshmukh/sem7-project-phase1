import React from "react";
import { useState } from "react";
import swal from "sweetalert";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFun = async (e) => {
    e.preventDefault();
    console.log("login");
    try {
      const artical = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify(artical),
      });
      const data = await response.json();
      if (data.error) {
        swal("Error", "Please enter valid data", "error");
      } else {
        swal(data.code, data.message, data.code.toLowerCase()).then(() => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("data", JSON.stringify(data));
          window.location.href = "/dashboard";
        });
      }
    } catch (error) {
      swal("Error", "Please enter valid data", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6">
        <div class="card border border-dark rounded">
          <div class="card-header text-center bg-dark text-white">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form onSubmit={loginFun}>
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
              <div className="text-center">
                <button type="submit" class="btn btn-success w-50 ">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

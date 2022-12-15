import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordc, setPasswordc] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const artical = { email, password, passwordc, name };
    if (password !== passwordc) {
      alert("Password not match");
    } else {
      console.log(artical);
    }
  };

  const passShow = () => {
    const pass = document.getElementById("passwordr");
    const pass2 = document.getElementById("passwordcr");
    if (pass.type === "password") {
      pass.type = "text";
      pass2.type = "text";
      // change the icon
      document.querySelector(".passeye").classList.remove("fa-eye");
      document.querySelector(".passeye").classList.add("fa-eye-slash");
    } else {
      pass.type = "password";
      pass2.type = "password";
      document.querySelector(".passeye").classList.remove("fa-eye-slash");
      document.querySelector(".passeye").classList.add("fa-eye");
    }
  };
  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-center">Login here</h3>
          <form className="m-4" onSubmit={handleSubmit}>
            <div class="form-group mb-3">
              <label for="">Email address</label>
              <input
                required
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <label for="">Enter Name</label>
              <input
                required
                type="text"
                class="form-control"
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label> <br />
              <div className="input-group">
                <input
                  required
                  placeholder="Password"
                  type="password"
                  id="passwordr"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="input-group-text">
                  <i
                    className="fa-solid fa-eye eye passeye"
                    onClick={passShow}
                  ></i>
                </span>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="">Confirm Password</label>
              <input
                required
                type="password"
                class="form-control"
                id="passwordcr"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPasswordc(e.target.value);
                }}
              />
            </div>

            <div className="text-center">
              <button type="submit" class="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

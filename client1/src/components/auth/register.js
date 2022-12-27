import React, { useState } from "react";
import swal from "sweetalert";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordc, setPasswordc] = useState("");
  const [name, setName] = useState("");

  // const register = (e) => {
  //     e.preventDefault();
  //     const artical = { email, password, passwordc, name };
  //     if (password !== passwordc) {
  //       alert("Password not match");
  //     } else {
  //       console.log(artical);
  //       register(artical).then((data) => {
  //         if (data.code === "Success") {
  //           swal(data.code, data.message, data.code.toLowerCase()).then(() => {
  //             window.location.href = "/dashboard";
  //           });
  //         } else {
  //           swal(data.code, data.message,data.code.toLowerCase());
  //         }
  //       });
  //     }
  //   };

  const register = async (e) => {
    e.preventDefault();
    console.log("register");
    if (password !== passwordc) {
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
            console.log(data);
            window.location.href = "/";
          });
        }
      } catch (error) {
        swal("Error", "Please enter valid data", "error");
      }
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
          <form className="m-4" onSubmit={register}>
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

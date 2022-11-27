import React, { useState } from "react";
import swal from "sweetalert";

export default function Offcanvas() {
  const data = JSON.parse(localStorage.getItem("data"));

  const [serverAddress, setServerAddress] = useState("");
  const [port, setPort] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveSMTP = (e) => {
    //prevent default form submit
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("data"));
    const user = data.data.username;
    const packet = {
      user: user,
      smtp: {
        serverAddress: serverAddress,
        port: port,
        email: email,
        password: password,
      },
    };
    console.log(packet);
    // post request to save smtp details
    fetch("http://localhost:5000/smtpConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify(packet),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal(data.code, data.message, data.code.toLowerCase());
      });
  };

  return (
    <div>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title">Profile</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Name : </td>
                <td>{data.data.name}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>{data.data.email}</td>
              </tr>
              <tr>
                <td>Username : </td>
                <td>{data.data.username}</td>
              </tr>
              <tr>
                <td>Current account pass : </td>
                <td>{data.data.password}</td>
              </tr>
            </tbody>
          </table>

          <div className="containner bg-dark text-white rounded">
            <div className="container">
              <form className="row m-2" onSubmit={saveSMTP}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>SMTP Server address</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={data.data.smtpConfig.host}
                      onChange={(e) => setServerAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12 m-1">
                  <div className="form-group">
                    <label>SMTP port</label>
                    <input
                      required
                      type="number"
                      className="form-control"
                      placeholder={data.data.smtpConfig.port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12 m-1">
                  <div className="form-group">
                    <label>SMTP Email address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder={data.data.smtpConfig.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12 m-1">
                  <div className="form-group">
                    <label>SMTP Email password</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={data.data.smtpConfig.password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12 m-1">
                  <div className="form-group">
                    <button className="btn btn-danger">
                      Save or Update SMTP Configuration
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <button className="btn btn-primary" onClick={updateData()}>
            update Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}

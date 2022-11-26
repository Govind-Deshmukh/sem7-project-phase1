import React, { useState } from "react";

export default function Offcanvas() {
  const data = JSON.parse(localStorage.getItem("data"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  //   const updateData = (e) => {
  //     //prevent default form submit
  //     e.preventDefault();
  //     prompt("Enter your name");
  //   };

  const saveSMTP = (e) => {
    //prevent default form submit
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("data"));
    const user = data.data.username;
    const packet = {
      user: user,
      smtp: {
        email: email,
        password: password,
        port: port,
        serverAddress: serverAddress,
      },
    };
    console.log(packet);
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
            <form className="row m-2" onSubmit={saveSMTP}>
              <div className="col-md-12">
                <div className="form-group">
                  <label>SMTP Server address</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="smtp.gmail.com"
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
                    placeholder="Enter port number"
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
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12 m-1">
                <div className="form-group">
                  <label>SMTP Email password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Enter your email password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12 m-1">
                <div className="form-group">
                  <button className="btn btn-danger">Save Configuration</button>
                </div>
              </div>
            </form>
          </div>

          {/* <button className="btn btn-primary" onClick={updateData()}>
            update Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}

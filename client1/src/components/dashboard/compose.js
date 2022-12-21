import React from "react";
import swal from "sweetalert";

import { useState } from "react";
import "./style2.css";
// import second from "first";
import Navbar from "./navbar";
export default function Compose() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [clist, setClist] = useState([]);

  const list_of_mail = JSON.parse(localStorage.getItem("segmentConfig"));
  // list_of_mail = list_of_mail[clist].contacts;
  // list_of_mail = list_of_mail.slice(1);
  const smtpconfigdata = JSON.parse(localStorage.getItem("smtpConfig"));

  const sendata = (e) => {
    e.preventDefault();
    const data = { to, subject, message, list_of_mail, smtpconfigdata, clist };

    fetch("http://localhost:5000/composemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        swal(data.code, data.message, data.code.toLowerCase()).then(() => {
          window.location.href = "/dashboard/compose";
        });
      });
  };

  const contactLists = Object.keys(
    JSON.parse(localStorage.getItem("segmentConfig"))
  );

  function addoption() {
    const select = document.querySelector(".myselect");
    for (let i = 0; i < contactLists.length; i++) {
      const option = document.createElement("option");
      option.value = contactLists[i];
      option.text = contactLists[i];
      select.appendChild(option);
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <br />
        <br />
        <div className="container bootdey">
          <div className="email-app">
            <nav>
              <a href="/dashboard/compose" className="btn btn-danger btn-block">
                New Email
              </a>
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-inbox"></i> Inbox{" "}
                    <span className="badge badge-danger">4</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-star"></i> Stared
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-rocket"></i> Sent
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-trash-o"></i> Trash
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-bookmark"></i> Important
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fa fa-inbox"></i> Inbox{" "}
                    <span className="badge badge-danger">4</span>
                  </a>
                </li>
              </ul>
            </nav>
            <main>
              <p className="text-center">New Message</p>
              <form onSubmit={sendata} method="post">
                <div className="form-row mb-3">
                  <label for="to" className="col-2 col-sm-1 col-form-label">
                    To:
                  </label>
                  <div className="col-10 col-sm-11">
                    <input
                      type="email"
                      className="form-control"
                      id="to"
                      placeholder="Type email"
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <label for="to" className="col-2 col-sm-1 col-form-label">
                    Contact List:
                  </label>

                  <div className="col-10 col-sm-11">
                    <select
                      class="form-select myselect my-1 mr-sm-2"
                      aria-label="Default select example"
                      onClick={addoption}
                      onChange={(e) => setClist(e.target.value)}
                    >
                      <option selected>Choose the following</option>
                    </select>
                  </div>
                </div>

                <div className="form-row mb-3">
                  <label for="cc" className="col-2 col-sm-1 col-form-label">
                    Subject:
                  </label>
                  <div className="col-10 col-sm-11 my-2">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Type email"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-11 ml-auto">
                    <div className="toolbar" role="toolbar">
                      <div className="btn-group">
                        <button type="button" className="btn btn-light">
                          <span
                            className="fa fa-bold"
                            onClick={() => {
                              const body = document.getElementById("message");
                              body.style.fontWeight = "bold";
                            }}
                            onDoubleClick={() => {
                              const body = document.getElementById("message");
                              body.style.fontWeight = "normal";
                            }}
                          ></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span
                            className="fa fa-italic"
                            onClick={() => {
                              const body = document.getElementById("message");
                              body.style.fontStyle = "italic";
                            }}
                          ></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-underline"></span>
                        </button>
                      </div>
                      <div className="btn-group">
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-align-left"></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-align-right"></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-align-center"></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-align-justify"></span>
                        </button>
                      </div>
                      <div className="btn-group">
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-indent"></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-outdent"></span>
                        </button>
                      </div>
                      <div className="btn-group">
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-list-ul"></span>
                        </button>
                        <button type="button" className="btn btn-light">
                          <span className="fa fa-list-ol"></span>
                        </button>
                      </div>
                      <button type="button" className="btn btn-light">
                        <span className="fa fa-trash-o"></span>
                      </button>
                      {/* <button type="button" className="btn btn-light">
                        <span className="fa fa-paperclip"></span>
                      </button> */}
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="fa fa-tags"></span>
                          <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            add label{" "}
                            <span className="badge badge-danger"> Home</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            add label{" "}
                            <span className="badge badge-info"> Job</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            add label{" "}
                            <span className="badge badge-success">
                              {" "}
                              Clients
                            </span>
                          </a>
                          <a className="dropdown-item" href="/">
                            add label{" "}
                            <span className="badge badge-warning"> News</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <textarea
                        className="form-control"
                        id="message"
                        name="body"
                        rows="8"
                        placeholder="Click here to reply"
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group my-4">
                      <button
                        type="submit"
                        className="btn btn-success"
                        // onClick={sendmail_handler}
                      >
                        send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

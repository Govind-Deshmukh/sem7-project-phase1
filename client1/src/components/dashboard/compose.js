import React from "react";
import swal from "sweetalert";

// import ckeditor
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState } from "react";
// import "./helper/style2.css";
// import second from "first";
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

  // const contactLists = Object.keys(
  //   JSON.parse(localStorage.getItem("segmentConfig"))
  // );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Compose</h4>
              </div>
              <div className="card-body">
                <form onSubmit={sendata}>
                  <div className="form-group">
                    <label htmlFor="to">To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div> */}
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello from CKEditor 5!</p>"
                      onInit={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setMessage(data);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Contact Lists</label>
                    <select
                      className="form-control"
                      value={clist}
                      onChange={(e) => setClist(e.target.value)}
                    >
                      {Object.keys(list_of_mail).map((list) => (
                        <option key={list} value={list}>
                          {list}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

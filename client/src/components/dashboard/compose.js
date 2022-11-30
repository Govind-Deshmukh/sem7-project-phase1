import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./css/ck.css";
import SelectContact from "./selectcontact";
export default function Compose() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // fetching ck editor data as html and setting it to message state
  const CKData = (event, editor) => {
    const data = editor.getData();
    setMessage(data);
    console.log(data);
  };

  // creating object named article for sending  message
  const article = {
    subject: subject,
    message: message,
  };

  // final form submit
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(article);
  };

  return (
    <div>
      <div className="card m-5 bg-dark p-3 text-white">
        <div className="card-body">
          <h3 className="card-title text-center">Compose a email</h3>
          <form onSubmit={formSubmit}>
            <div className="form-group mb-3">
              <h5 className="mt-2 mb-2">Subject for Email</h5>
              <input
                type="text"
                className="form-control"
                onChange={setSubject}
              />
            </div>
            <div className="form-group mb-3">
              <h5 className="mt-2 mb-2">Create Message</h5>
              <div className="text-dark">
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    console.log("Editor is ready");
                  }}
                  onChange={CKData}
                />
              </div>
            </div>
            <SelectContact />
            <div className="row mt-5 mb-1">
              <div className="col-4">
                <div className="form-group">
                  <label className="form-check-label">
                    Select HTML File as message
                  </label>
                  <input type="file" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-warning w-100">
                  Send CC
                </button>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-success w-100">
                  Send BCC
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

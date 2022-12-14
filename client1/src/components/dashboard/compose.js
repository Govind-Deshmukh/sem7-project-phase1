import React, { useState } from "react";
// import checkData from "./helper/checkData"
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Compose() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [segment, setSegment] = useState("");

  // call CC send mail function
  const sendCC = (e) => {
    e.preventDefault();
    document.getElementById("bcc").style.display = "none";
  };

  // call BCC send mail function
  const sendBCC = (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const artical = { message, subject, segment, type: "bcc", user };
      console.log(artical);
      // write your own logic to send mail
    } catch (err) {
      swal("Error", "Something went wrong", "error");
    }
  };

  const newfunc = () => {
    console.log(localStorage.getItem("segmentConfig"));
    if (localStorage.getItem("segmentConfig")) {
      return Object.keys(JSON.parse(localStorage.getItem("segmentConfig"))).map(
        (item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        }
      );
    } else {
      console.log("Error");
    }
  };

  try {
    return (
      <>
        <div className="m-5">
          <div className="row">
            <div className="col-md-2  mt-2">
              <ul class="list-group mt-3">
                <Link class="list-group-item active" to="/dashboard">
                  Compose Mail
                </Link>
                <Link class="list-group-item" to="/dashboard/inbox">
                  Inbox
                </Link>
                <li class="list-group-item">Sent Mails</li>
                <li class="list-group-item">Spam Mails</li>
              </ul>
            </div>
            <div className="col-md-10 mt-2 shadow-lg p-3 mb-5 rounded">
              <div className="card rounded border">
                <div className="card-header">
                  <h3>Compose a mail</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group mb-3">
                      <label className="form-label">Enter mail subject</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter mail subject"
                        onchange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Type message in editor
                      </label>
                      <CKEditor
                        required
                        editor={ClassicEditor}
                        onReady={(editor) => {
                          console.log("You are ready to use the editor");
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setMessage(data);
                          console.log(data);
                        }}
                      />
                    </div>

                    <div class="form-group mb-3">
                      <label className="form-label">
                        Select target segment
                      </label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setSegment(e.target.value);
                        }}
                      >
                        {newfunc()}
                      </select>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-info m-3"
                        onSubmit={sendCC}
                        id="submitBTNCC"
                        value="cc"
                      >
                        Send Mail as CC
                      </button>
                      <button
                        type="submit"
                        id="submitBTNBCC"
                        className="btn btn-primary m-3"
                        onSubmit={sendBCC}
                        value="bcc"
                      >
                        Send Mail as BCC
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    swal("Error", "Configure segments first to get started with", "error");
  }
}

import React, { useState } from "react";
// import checkData from "./helper/checkData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Compose() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    console.log(subject);
  };

  return (
    <>
      <div className="m-5">
        <div className="row">
          <div className="col-md-2 rounded border border-secondary"></div>
          <div className="col-md-10">
            <div className="card rounded border border-secondary">
              <div className="card-header">
                <h3>Compose a mail</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mail subject"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Type message in editor</label>
                    <CKEditor
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!");
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setMessage(data);
                        console.log({ event, editor, data });
                      }}
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label className="form-label">Select target segment</label>
                    <select class="form-control" required>
                      {Object.keys(
                        JSON.parse(localStorage.getItem("segmentConfig"))
                      ).map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
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

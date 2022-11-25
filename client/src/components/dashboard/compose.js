import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Compose() {
  const CKData = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
  };
  return (
    <div>
      <div className="card m-5">
        <div className="card-body">
          <h5 className="card-title text-center">Compose a email</h5>
          <form>
            <div className="form-group mb-3">
              <h5 className="mt-2 mb-2">Subject for Email</h5>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <h5 className="mt-2 mb-2">Create Message</h5>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    console.log("Editor is ready");
                  }}
                  onChange={CKData}
                  onInit={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                />
              </div>
            </div>
            <div className="row mt-2 mb-2">
              <div className="col-4">
                <div className="form-check">
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

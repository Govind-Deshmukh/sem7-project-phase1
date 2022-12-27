import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
export default function inbox() {
  return (
    <div>
      <Navbar />
      <div className="m-5">
        <div className="row">
          <div className="col-md-2  mt-2">
            <ul class="list-group mt-3">
              <Link class="list-group-item" to="/dashboard">
                Compose Mail
              </Link>
              <Link class="list-group-item active" to="/dashboard/inbox">
                Inbox
              </Link>
              <li class="list-group-item">
                Sent Mails{" "}
                <span className="form-text text-muted">(Disabled)</span>
              </li>
              <li class="list-group-item">
                Spam Mails{" "}
                <span className="form-text text-muted">(Disabled)</span>
              </li>
            </ul>
          </div>
          <div className="col-md-10 mt-2 shadow-lg p-3 mb-5 rounded">
            <div className="card rounded border">
              <h1>this is inbox</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

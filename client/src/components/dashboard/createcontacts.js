import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import Navbar from "./navbar";
import swal from "sweetalert";
export default function Contacts() {
  const [ContactListName, setContactListName] = useState();
  const [ContactListData, setContactList] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      setContactList(rows);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const packet = {
        // get user from localStorage
        user: JSON.parse(localStorage.getItem("data")).data.username,
        ContactListName: ContactListName,
        ContactListData: ContactListData,
      };
      console.log(packet);
      const response = await fetch("http://localhost:5000/contactList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(packet),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data.data));

      if (data.error) {
        swal(data.code, data.message, data.code.toLowerCase());
      } else {
        swal(data.code, data.message, data.code.toLowerCase()).then(() => {
          window.location.href = "/dashboard/CreateContactList";
        });
      }
    } catch {
      swal("Error", "Error creating list", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container m-5">
        <a href="/dashboard" className="btn btn-secondary">
          Go Back to Dashboard
        </a>
      </div>
      <div className=" container rounded mb-3 px-md-5 bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <div className="mt-3 form-group mb-3">
            <h3 className="text-center">Create Contact list </h3>
          </div>

          <div className="mt-3 form-group mb-3">
            <label>Name of Contact list</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => setContactListName(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3">
            <input
              required
              type="file"
              className="form-control"
              onChange={handleFile}
            />
            <label className="custom-file-label">Choose file</label>
          </div>
          <div className="form-group mb-5 col-4">
            <button className="btn btn-warning mb-5 w-100" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import Navbar from "./navbar";
// import swal from "sweetalert";
export default function Contacts() {
  const [ContactListName, setContactListName] = useState();
  const [ContactListData, setContactList] = useState([]);

  // create a async function that will send the data to server
  const formSubmit = async () => {
    // console.log("5");
    const artical = {
      user: JSON.parse(localStorage.getItem("data")).data.username,
      ContactListName: ContactListName,
      ContactListData: ContactListData,
    };
    // console.log("6");
    console.log(artical);
    // console.log("7");
  };

  const contactListName = (e) => {
    setContactListName(e.target.value);
    console.log(ContactListName);
  };

  const readExcelFile = (e) => {
    const file = e.target.files[0];
    console.log("1");
    console.log(file);
    console.log("2");
    readXlsxFile(file).then((rows) => {
      console.log("3");
      console.log(rows);
      // convert rows to object
      const data = {};
      rows.forEach((row, index) => {
        if (index === 0) {
          data.headers = row;
        } else {
          data[index] = {};
          row.forEach((cell, cellIndex) => {
            data[index][data.headers[cellIndex]] = cell;
          });
        }
      });
      console.log("4");
      console.log(data);
      setContactList(data);

      // setContactList(rows);
    });
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
        <form onSubmit={formSubmit}>
          <div className="mt-3 form-group mb-3">
            <h3 className="text-center">Create Contact list </h3>
          </div>

          <div className="mt-3 form-group mb-3">
            <label>Name of Contact list</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={contactListName}
            ></input>
          </div>
          <div className="form-group mb-3">
            <input
              required
              type="file"
              className="form-control"
              onChange={readExcelFile}
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

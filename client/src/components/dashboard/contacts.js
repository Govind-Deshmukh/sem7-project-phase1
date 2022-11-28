import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import * as XLSX from "xlsx";

export default function Contacts() {
  const [ContactListName, setContactListName] = useState();
  const [ContactList, setContactList] = useState({});

  const readExcelFIle = (file) => {
    console.log(file.target.files[0]);
    const xyz = file.target.files[0];
    readXlsxFile(xyz).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      // console.log(rows);
      setContactList(rows);
    });
    const fileData = {
      listName: ContactListName,
      list: ContactList,
    };
  };

  const ContactListForm = () => {
    console.log(ContactList, "and the line", ContactListName);
  };
  return (
    <div className=" mb-3 px-md-5">
      <form onChange={ContactListForm} encType="multipart/form-data">
        <div className="mt-3 form-group mb-3">
          <h3 className="text-center">Create Contact list </h3>
        </div>

        <div className="mt-3 form-group mb-3">
          <label>Name of Contact list</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContactListName(e.target.value)}
          ></input>
        </div>
        <div className="form-group mb-3">
          <input
            type="file"
            className="custom-file-input"
            onChange={readExcelFIle}
          />
          <label className="custom-file-label">Choose file</label>
        </div>
        <div className="form-group mb-5">
          <button className="btn btn-primary mb-5" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

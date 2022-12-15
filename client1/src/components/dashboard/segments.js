import React, { useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import readXlsxFile from "read-excel-file";

export default function Segments() {
  const [segmentName, setSegmentName] = useState("");
  const [rows, setSegmentData] = useState([]);

  // read excel sheet data
  const readExcel = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      console.log(rows);
      setSegmentData(rows);
    });
  };

  const saveSegment = (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user")).username;
      const packet = {
        user: user,
        segment: {
          segmentName: segmentName,
          segmentData: rows,
        },
      };
      console.log(packet);
      fetch("http://localhost:5000/contactList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(packet),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            localStorage.setItem(
              "segmentConfig",
              JSON.stringify(data.data.contactList)
            );
            window.location.href = "/dashboard/profile";
          });
        });
    } catch (err) {
      swal("Error", "Please login again (Front end error)", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-3">
        <div class="card rounded border border-dark">
          <div class="card-header border-bottom border-dark">
            <h4 class="card-title">Configure your Contact Segments</h4>
          </div>
          <div class="card-body">
            <form onSubmit={saveSegment}>
              <div class="form-group row mb-3">
                <label class="col-sm-2 col-form-label">Segment Name</label>
                <div class="col-sm-10">
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Enter segment contact list name"
                    onChange={(e) => {
                      setSegmentName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group row mb-3">
                <label class="col-sm-2 col-form-label">
                  Select Excel file containing emails
                </label>
                <div class="col-sm-10">
                  <input
                    required
                    type="file"
                    class="form-control"
                    onChange={readExcel}
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" class="btn btn-lg btn-success">
                  Save or Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
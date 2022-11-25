import React from "react";

export default function offcanvas() {
  const data = JSON.parse(localStorage.getItem("data"));

  //   const updateData = (e) => {
  //     //prevent default form submit
  //     e.preventDefault();
  //     prompt("Enter your name");
  //   };

  return (
    <div>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title">Profile</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Name : </td>
                <td>{data.data.name}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>{data.data.email}</td>
              </tr>
              <tr>
                <td>Username : </td>
                <td>{data.data.username}</td>
              </tr>
              <tr>
                <td>Current account pass : </td>
                <td>{data.data.password}</td>
              </tr>
            </tbody>
          </table>

          {/* <button className="btn btn-primary" onClick={updateData()}>
            update Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}

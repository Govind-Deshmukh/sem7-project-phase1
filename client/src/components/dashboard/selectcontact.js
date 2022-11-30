import React, { useState } from "react";
import swal from "sweetalert";
export default function Contact() {
  const [selectedList, setSelectedList] = useState("");
  const [contactList, setContactList] = useState([]);
  window.onload = () => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
      setContactList(Object.keys(data.data.contactList));
      console.log(contactList);
      console.log("main", Object.keys(data.data.contactList));
    } catch {
      swal("No Contact List", "Please create a contact list", "info");
      window.location.href = "/dashboard/CreateContactList";
    }
  };

  return (
    <div className="form-group mb-3">
      <h5 className="mt-2 mb-2 text-bold">Select Segment</h5>
      <select
        defaultValue={selectedList}
        className="form-select"
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option defaultValue={""}>Select segment from options</option>
        {contactList.map((item) => (
          <option key={item} value={item}></option>
        ))}
      </select>
    </div>
  );
}

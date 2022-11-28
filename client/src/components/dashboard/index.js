import React from "react";
import Navbar from "./navbar";
import Offcanvas from "./offcanvas";
import Compose from "./compose";
import Contacts from "./contacts";
export default function Index() {
  return (
    <div>
      <Navbar />
      <Offcanvas />
      <Compose />
      <div className="container bg-dark text-white rounded">
        <Contacts />
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "./navbar";
import Offcanvas from "./offcanvas";
import Compose from "./compose";
export default function Index() {
  return (
    <div>
      <Navbar />
      <Offcanvas />
      <Compose />
    </div>
  );
}

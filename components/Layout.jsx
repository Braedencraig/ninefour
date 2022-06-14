import React from "react";
import Link from "next/link";
import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <div className="page-content">{children}</div>
    </div>
  );
}

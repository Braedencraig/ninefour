import React from "react";
import Link from "next/link";
import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      {/* <header>
        <Link href="/">
          <a>GO BACK HOME</a>
        </Link>
      </header> */}
      <div className="page-content">{children}</div>
    </div>
  );
}

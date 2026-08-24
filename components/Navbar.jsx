/* eslint-disable @next/next/no-img-element */
import logo from "../public/assets/logo.png";
import Link from "next/link";

const NavBar = () => (
  <header>
    <ul className="navbar">
      <li className="navbar__title navbar__item">
        <Link href="/">
          <img
            src={logo.src}
            alt="Nine Four entertainment logo"
            width={72}
            height={72}
          />
        </Link>
      </li>
      <li className="navbar__item hover">
        <Link href="/about">About</Link>
      </li>
      <li className="navbar__item hover">
        <Link href="/talent">Talent</Link>
      </li>
      <li className="navbar__item hover">
        <Link href="/our-brands">Our Brands</Link>
      </li>
      <li className="navbar__item hover">
        <Link href="/press">Press</Link>
      </li>
      <li className="navbar__item hover">
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  </header>
);

export default NavBar;

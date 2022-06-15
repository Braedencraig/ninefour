import logo from "../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => (
  <header>
    <ul className="navbar">
      <li className="navbar__title navbar__item">
        <Link href="/">
          <a>
            <Image src={logo.src} alt="Nine Four entertainment logo" width={72} height={72} />
          </a>
        </Link>
      </li>
      <li className="navbar__item">
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li className="navbar__item">
        <Link href="/talent">
          <a>Talent</a>
        </Link>
      </li>
      <li className="navbar__item">
        <Link href="/our-brands">
          <a>Our Brands</a>
        </Link>
      </li>
      <li className="navbar__item">
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </li>
    </ul>
  </header>
);

export default NavBar;

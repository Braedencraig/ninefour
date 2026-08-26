import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useOnClickOutside } from "../hooks/useOnClick";
import Link from "next/link";
import NavBar from "./Navbar";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #000;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  height: 100dvh;
  text-align: center;
  padding: max(4.75rem, env(safe-area-inset-top)) 1.5rem
    max(2rem, env(safe-area-inset-bottom));
  position: fixed;
  inset: 0;
  overflow: hidden;
  transition: transform 0.4s ease-in-out;
  width: 100%;
  z-index: 100;
  pointer-events: ${({ open }) => (open ? "auto" : "none")};

  a {
    font-size: clamp(1.35rem, 5.2vw, 2rem);
    text-transform: uppercase;
    padding: clamp(0.55rem, 1.8vh, 1.15rem) 0;
    font-weight: bold;
    letter-spacing: 0.18em;
    line-height: 1.1;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: orange;
    }
  }
`;

const Menu = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <StyledMenu open={open} isTalent={router.pathname.includes("talent")}>
      <Link href="/" onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link href="/about" onClick={() => setOpen(false)}>
        About
      </Link>
      <Link href="/talent" onClick={() => setOpen(false)}>
        Talent
      </Link>
      <Link href="/our-brands" onClick={() => setOpen(false)}>
        Our Brands
      </Link>
      <Link href="/press" onClick={() => setOpen(false)}>
        Press
      </Link>
      <Link href="/contact" onClick={() => setOpen(false)}>
        Contact
      </Link>
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: fixed;
  top: max(1.15rem, env(safe-area-inset-top));
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const StyledBurgerTalent = styled.button`
  position: fixed;
  top: max(1.15rem, env(safe-area-inset-top));
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    @media (max-width: 900px) {
      background: ${({ open }) => (open ? "white" : "black")};
    }

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  const router = useRouter();

  if (router.pathname.includes("/talent/[slug]")) {
    return (
      <StyledBurgerTalent open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurgerTalent>
    );
  }

  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const router = useRouter();
  useOnClickOutside(node, () => setOpen(false));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeMenu = () => setOpen(false);

    router.events.on("routeChangeStart", closeMenu);

    return () => {
      router.events.off("routeChangeStart", closeMenu);
    };
  }, [router]);

  return (
    <div className={`layout fadeIn${open ? " menu-open" : ""}`}>
      <NavBar />
      <div ref={node} className="mobile-nav">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <div className="page-content" aria-hidden={open}>
        {children}
      </div>
    </div>
  );
}

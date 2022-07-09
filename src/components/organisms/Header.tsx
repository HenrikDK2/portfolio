import { css, styled } from "goober";
import React, { FC, useRef, useState, useEffect, memo } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "../atoms/Links";

const Nav = styled("nav")`
  z-index: 10;
  position: absolute;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 515px) {
    transform: none;
    left: initial;
    width: auto;
    position: fixed;
    opacity: 1;
    transform: translateX(0);
    top: 0;
    right: 0;
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.2);
    border-radius: 0 0 0 10px;
    transition: transform 1s;
    transition-property: transform, opacity;
  }
`;

const BarsButton = styled("button")`
  cursor: pointer;
  width: 70px;
  position: fixed;
  top: 20px;
  z-index: 4;
  background-color: transparent;
  border: none;
  padding: 0;
  right: 20px;
  display: none;
  transition: opacity 1s;
  @media (max-width: 515px) {
    display: block;
  }
  & > svg {
    font-size: 4rem;
    color: var(--primary);
  }
`;

const TitleItem = styled("li")`
  font-size: 2rem;
  font-weight: bold;
  margin-right: auto;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const NavList = styled("ul")`
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  align-items: center;
  display: flex;
  color: #d9d9d9;
  justify-content: flex-end;
  padding: 20px 200px;
  list-style: none;

  @media (max-width: 860px) {
    padding: 20px 0;
  }

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 515px) {
    font-size: 1.75rem;
    color: #fff;
    background-color: var(--primary);
    flex-direction: column;
    text-align: right;
    border-radius: 0 0 0 10px;
  }
`;

export const Header: FC = memo(() => {
  const [menuHidden, setMenuHidden] = useState<boolean>(true);
  const ref = useRef<HTMLElement>(null);

  const menuHiddenStyle = css`
    @media (max-width: 515px) {
      ${menuHidden
        ? `
            opacity: 0;
            transform: translateX(100%);
          `
        : `
            opacity: 1;
            transform: translateX(0);
          `}
    }
  `;

  const clickLinkHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    scrollElementId: string,
    phoneScrollBlock?: ScrollIntoViewOptions["block"]
  ) => {
    e.preventDefault();
    let block: ScrollIntoViewOptions["block"] = "center";
    if (window.innerWidth < 515) {
      setMenuHidden(!menuHidden);
      block = phoneScrollBlock;
    }

    document.getElementById(scrollElementId)?.scrollIntoView({
      behavior: "smooth",
      block: block,
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setMenuHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return (
    <header ref={ref}>
      {menuHidden && (
        <BarsButton
          aria-label="Burger Menu"
          onClick={() => setMenuHidden(!menuHidden)}
        >
          <FaBars />
        </BarsButton>
      )}

      <Nav className={menuHiddenStyle}>
        <NavList>
          <TitleItem>Henrik Mundt Milo</TitleItem>
          <li>
            <NavLink
              href="/"
              onClick={(e) => clickLinkHandler(e, "aboutMe", "start")}
            >
              Omkring Mig
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/"
              onClick={(e) => clickLinkHandler(e, "projects", "start")}
            >
              Mine Projekter
            </NavLink>
          </li>
          <li>
            <NavLink href="/" onClick={(e) => clickLinkHandler(e, "contact")}>
              Kontakt
            </NavLink>
          </li>
        </NavList>
      </Nav>
    </header>
  );
});

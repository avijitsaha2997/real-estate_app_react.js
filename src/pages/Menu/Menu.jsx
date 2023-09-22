import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import the ScrollTrigger plugin
import { useStateValue } from "../../states/StateProvider";
import Dropdown from "./partials/Dropdown";

import backsapce from "../../assets/images/global/backspace-outline.png";
gsap.registerPlugin(ScrollTrigger);

const Menu = (props) => {
  const [{ isDropdownMenuOpen, showModal }, dispatch] = useStateValue();
  const [isMobileView, setIsMobileView] = useState(true);
  const menuRef = useRef();

  let location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    closeDropdown();
  }, [location.pathname, showModal]);

  useLayoutEffect(() => {
    let handle = (e) => {
      const distanceFromTop = window.scrollY;

      if (menuRef.current) {
        const menuHeight = menuRef.current?.offsetHeight;
        const menuOffsetTop = menuRef.current?.offsetTop;
        if (distanceFromTop > menuHeight + menuOffsetTop) {
          closeDropdown();
        }
      }
      if (!menuRef.current?.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handle);
    window.addEventListener("scroll", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("scroll", handle);
    };
  }, [isDropdownMenuOpen, menuRef]);

  useLayoutEffect(() => {
    if (isDropdownMenuOpen) {
      if (props.mobileView) {
        gsap.fromTo(
          menuRef.current,
          {
            right: "-100%",
            top: "0",
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            // smooth: true,
          },
          {
            right: "0",
            top: "0",
            opacity: 1,
            duration: 0.7,
            ease: "power1.out",
            // smooth: true,
          }
        );
      } else {
        gsap.fromTo(
          menuRef.current,
          {
            top: "0",
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            // smooth: true,
          },
          {
            top: "140px",
            opacity: 1,
            duration: 0.7,
            ease: "power1.out",
            // smooth: true,
          }
        );
      }
    } else {
      if (props.mobileView) {
        gsap.fromTo(
          menuRef.current,
          {
            right: "0",
            top: "0",
            opacity: 1,
            duration: 0.7,
            ease: "power1.out",
            smooth: true,
          },
          {
            right: "-100%",
            top: "0",
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            smooth: true,
          }
        );
      } else {
        gsap.fromTo(
          menuRef.current,
          {
            top: "140px",
            opacity: 1,
            duration: 0.7,
            ease: "power1.out",
            smooth: true,
          },
          {
            top: "0",
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
            smooth: true,
          }
        );
      }
    }
  }, [isDropdownMenuOpen]);

  const closeDropdown = () => {
    dispatch({ type: "setDropdownOpen", item: false });
  };

  return (
    <div
      style={{
        marginTop: isMobileView ? "" : "-68px",
        display: isDropdownMenuOpen ? "" : "none",
        zIndex: "100",
      }}
      className={`${
        isDropdownMenuOpen
          ? " w-[100vw] h-[100vh] md:h-[300px] bg-gradient-to-r from-[#000F1D] to-[#0B233A] fixed  right-0 top-[0px] transition-all"
          : ""
      } `}
      ref={menuRef}>
      <span
        onClick={closeDropdown}
        className="absolute top-5 right-5 md:hidden">
        <img src={backsapce} alt="backspace" />
      </span>
      <Dropdown isMobileView={props.mobileView} />
    </div>
  );
};

export default Menu;

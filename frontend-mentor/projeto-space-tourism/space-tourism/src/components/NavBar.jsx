import Logo from "../assets/shared/logo.svg";
import Hamburger from "../assets/shared/icon-hamburger.svg";
import Close from "../assets/shared/icon-close.svg";

import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ activeLink, setActiveLink }) => {
   const [activeHamburger, setActiveHambuger] = useState(false);

   const handleSetActive = link => {
      setActiveLink(link);

      if (link === "logo") {
         if (activeHamburger) openMenu();
         return;
      }

      if(link === "explore") {
         if(!activeHamburger) openMenu();
         return
      }
      openMenu();
   };

   const openMenu = () => {
      setActiveHambuger(!activeHamburger);
   };

   return (
      <nav className="flex justify-between items-center p-12 max-xl:p-0 max-sm:p-8">
         <Link
            onClick={() => handleSetActive("logo")}
            to="/"
            className="max-xl:ml-6 max-sm:m-0"
         >
            <img src={Logo} alt="logo" />
         </Link>

         <button onClick={openMenu} className="z-10">
            <img
               src={activeHamburger ? Close : Hamburger}
               alt="menu-hamburger"
               className="hidden w-8 max-sm:block max-sm:w-10"
            />
         </button>
         <ul
            className={`relative w-[65%] bg-white/5 backdrop-blur-sm py-5 px-24 flex items-center justify-around max-xl:px-6 max-xl:justify-center max-xl:gap-10 max-sm:justify-around max-sm:absolute max-sm:flex-col max-sm:h-[100vh] top-0 ${
               activeHamburger
                  ? "max-sm:animate-showNavbar max-sm:right-0"
                  : "max-sm:animate-hideNavbar max-sm:right-[-100%]"
            }`}
         >
            <div className="w-[50%] border-t-[1px] border-t-white/20 left-[-40%] absolute max-lg:hidden"></div>
            <li className="my-4">
               <NavLink
                  to="/"
                  onClick={() => handleSetActive("home")}
                  className={`uppercase py-2 text-white/80 border-b-4 ${
                     activeLink === "home" || activeLink === "logo"
                        ? "border-b-white"
                        : "border-b-transparent"
                  } transition-colors hover:border-b-white/50 max-xl:text-sm max-sm:text-xl`}
               >
                  <span className="text-white font-bold mr-2 max-lg:hidden">
                     00
                  </span>{" "}
                  Home
               </NavLink>
            </li>
            <li className="my-4">
               <NavLink
                  to="/destination"
                  onClick={() => handleSetActive("destination")}
                  className={`uppercase py-2 text-white/80 border-b-4 ${
                     activeLink === "destination"
                        ? "border-b-white"
                        : "border-b-transparent"
                  } transition-colors hover:border-b-white/50 max-xl:text-sm max-sm:text-xl`}
               >
                  <span className="text-white font-bold mr-2 max-lg:hidden">
                     01
                  </span>{" "}
                  Destination
               </NavLink>
            </li>
            <li className="my-4">
               <NavLink
                  to="/crew"
                  onClick={() => handleSetActive("crew")}
                  className={`uppercase py-2 text-white/80 border-b-4 ${
                     activeLink === "crew"
                        ? "border-b-white"
                        : "border-b-transparent"
                  } transition-colors hover:border-b-white/50 max-xl:text-sm max-sm:text-xl`}
               >
                  <span className="text-white font-bold mr-2 max-lg:hidden">
                     02
                  </span>{" "}
                  Crew
               </NavLink>
            </li>
            <li className="my-4">
               <NavLink
                  to="/technology"
                  onClick={() => handleSetActive("technology")}
                  className={`uppercase py-2 text-white/80 border-b-4 ${
                     activeLink === "technology"
                        ? "border-b-white"
                        : "border-b-transparent"
                  } transition-colors hover:border-b-white/50 max-xl:text-sm max-sm:text-xl`}
               >
                  <span className="text-white font-bold mr-2 max-lg:hidden">
                     03
                  </span>{" "}
                  Technology
               </NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;

import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

// Images
import bgHomeDesk from "../assets/home/background-home-desktop.jpg";
import bgHomeTablet from "../assets/home/background-home-tablet.jpg";
import bgHomeMobile from "../assets/home/background-home-mobile.jpg";

import bgDestinationDesk from "../assets/destination/background-destination-desktop.jpg";
import bgDestinationTablet from "../assets/destination/background-destination-tablet.jpg";
import bgDestinationMobile from "../assets/destination/background-destination-mobile.jpg";

import bgCrewDesk from "../assets/crew/background-crew-desktop.jpg";
import bgCrewTablet from "../assets/crew/background-crew-tablet.jpg";
import bgCrewMobile from "../assets/crew/background-crew-mobile.jpg";

import bgTechnologyDesk from "../assets/technology/background-technology-desktop.jpg";
import bgTechnologyTablet from "../assets/technology/background-technology-tablet.jpg";
import bgTechnologyMobile from "../assets/technology/background-technology-mobile.jpg";

// Pages
import Home from "../pages/Home/Home";
import NavBar from "../components/NavBar";
import Destination from "../pages/Destination/Destination";
import Crew from "../pages/Crew/Crew";
import Technology from "../pages/Technology/Technology";

function App() {
   const [activeLink, setActiveLink] = useState("home");

   const location = useLocation();
   const [backgroundImage, setBackgroundImage] = useState("");

   const updateBackgroundImage = () => {
      const backgroundMap = {
         "/": {
            desktop: bgHomeDesk,
            tablet: bgHomeTablet,
            mobile: bgHomeMobile,
         },
         "/destination": {
            desktop: bgDestinationDesk,
            tablet: bgDestinationTablet,
            mobile: bgDestinationMobile,
         },
         "/crew": {
            desktop: bgCrewDesk,
            tablet: bgCrewTablet,
            mobile: bgCrewMobile,
         },
         "/technology": {
            desktop: bgTechnologyDesk,
            tablet: bgTechnologyTablet,
            mobile: bgTechnologyMobile,
         },
      };

      const screenWidth = window.innerWidth;
      const currentBackground =
         backgroundMap[location.pathname] || backgroundMap["/"];

      if (screenWidth >= 1024) {
         setBackgroundImage(currentBackground.desktop);
      } else if (screenWidth >= 640) {
         setBackgroundImage(currentBackground.tablet);
      } else {
         setBackgroundImage(currentBackground.mobile);
      }
   };

   useEffect(() => {
      updateBackgroundImage();

      window.addEventListener("resize", updateBackgroundImage);

      return () => {
         window.removeEventListener("resize", updateBackgroundImage);
      };
   }, [location]);

   return (
      <div
         className="bg-cover bg-no-repeat bg-center min-h-screen"
         style={{
            backgroundImage: `url(${backgroundImage})`,
         }}
      >
         <NavBar activeLink={activeLink} setActiveLink={setActiveLink} />
         <Routes>
            <Route path="/" element={<Home setActiveLink={setActiveLink} />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/technology" element={<Technology />} />
         </Routes>
      </div>
   );
}

export default App;

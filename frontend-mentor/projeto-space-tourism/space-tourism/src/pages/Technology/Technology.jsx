import { useState, useContext } from "react";
import { DataContext } from "../../components/DataContext";

import launchPortrait from "../../assets/technology/image-launch-vehicle-portrait.jpg";
import launchLandscape from "../../assets/technology/image-launch-vehicle-landscape.jpg";

import spacePortrait from "../../assets/technology/image-space-capsule-portrait.jpg";
import spaceLandscape from "../../assets/technology/image-space-capsule-landscape.jpg";

import spacePortPortrait from "../../assets/technology/image-spaceport-portrait.jpg";
import spacePortLandscape from "../../assets/technology/image-spaceport-landscape.jpg";

const Technology = () => {
   const { technology } = useContext(DataContext);
   const [currentTechnology, setCurrentTehnology] = useState("Launch vehicle");
   const [active, setActive] = useState(0);

   const imageMap = {
      "Launch vehicle": {
         portrait: launchPortrait,
         landscape: launchLandscape,
      },
      "Space capsule": {
         portrait: spacePortrait,
         landscape: spaceLandscape,
      },
      Spaceport: {
         portrait: spacePortPortrait,
         landscape: spacePortLandscape,
      },
   };

   const handleClick = index => {
      setActive(index);

      // const tech = technology[number - 1];
      setCurrentTehnology(technology[index]);
   };

   const currentImages =
      imageMap[currentTechnology.name] || imageMap["Launch vehicle"];

   return (
      <main className="w-[80%] max-w-[1350px] min-h-custom mx-auto flex flex-col text-textColor max-xl:w-[90%] max-lg:w-full max-[468px]:w-full">
         <h1 className="self-start text-3xl uppercase text-white mt-12 max-lg:w-full max-lg:text-center max-sm:text-2xl">
            <span className="mr-4 font-bold text-white/25">02</span>
            Space Launch 101
         </h1>
         <div className="flex max-lg:flex-col-reverse max-lg:justify-between">
            <div className="flex gap-20 justify-around w-[65%] mt-32 max-lg:mb-12 max-lg:w-[90%] max-lg:mx-auto max-lg:flex-col max-lg:items-center max-lg:gap-0 max-lg:mt-6">
               <div className="flex flex-col gap-4 max-lg:flex-row max-lg:gap-16 max-lg:mb-14 max-sm:gap-8">
                  {technology &&
                     technology.map((tech, index) => (
                        <button
                           key={tech.name}
                           onClick={() => handleClick(index)}
                           className={`text-4xl font-bellefair border-2 border-white/50 rounded-full w-24 h-24 ${
                              active === index
                                 ? "bg-white border-white text-black"
                                 : null
                           } max-sm:w-16 max-sm:h-16`}
                        >
                           {index + 1}
                        </button>
                     ))}
               </div>
               <div className="max-lg:flex flex-col items-center">
                  <h3 className="uppercase text-white/50 text-xl">
                     The Therminology...
                  </h3>
                  <h2 className="uppercase text-white text-5xl mt-5 mb-8 font-bellefair max-sm:text-4xl max-sm:text-center">
                     {currentTechnology.name || "Launch vehicle"}
                  </h2>
                  <p className="w-[75%] text-xl max-xl:w-full max-lg:text-center max-sm:text-[16px]">
                     {currentTechnology.description ||
                        "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"}
                  </p>
               </div>
            </div>
            <div className="absolute top-[25%] right-0 mt-14 max-xl:w-[35%] max-lg:static max-lg:w-screen max-lg:mb-2">
               <picture>
                  <source
                     srcSet={currentImages.landscape}
                     media="(max-width: 1024px)"
                  />
                  <img
                     src={currentImages.portrait}
                     alt={currentTechnology.name || "Launch vehicle"}
                     className="w-full"
                  />
               </picture>
            </div>
         </div>
      </main>
   );
};

export default Technology;

import { useState, useContext } from "react";
import { DataContext } from "../../components/DataContext";

import Moon from "../../assets/destination/image-moon.png";
import Mars from "../../assets/destination/image-mars.png";
import Europa from "../../assets/destination/image-europa.png";
import Titan from "../../assets/destination/image-titan.png";

const Destination = () => {
   const { destinations } = useContext(DataContext);
   const [selectedDestination, setSelectedDestination] = useState("Moon");

   const images = {
      Moon,
      Mars,
      Europa,
      Titan,
   };

   const handleClick = planetName => {
      const planet = destinations.find(d => d.name === planetName);
      setSelectedDestination(planet);
   };

   return (
      <main className="w-[85%] max-w-[1350px] mx-auto min-h-custom flex flex-col text-textColor">
         <h1 className="self-start text-3xl uppercase text-white mt-12 mb-24 max-lg:w-full max-lg:text-center max-sm:text-2xl">
            <span className="mr-4 font-bold text-white/25">01</span>Pick your
            destination
         </h1>
         <div className="flex justify-around max-[1280px]:justify-between max-lg:flex-col max-lg:gap-20">
            <div>
               <img
                  className="mx-auto block w-[380px]"
                  src={images[selectedDestination.name] || Moon}
                  alt={selectedDestination.name || "Moon"}
               />
            </div>
            <div className="w-[500px] max-[1280px]:w-[440px] max-lg:w-full max-lg:mb-16">
               <div className="max-lg:flex max-lg:justify-center max-lg:gap-10 max-sm:mb-14 max-sm:gap-6">
                  {destinations &&
                     destinations.map(destination => (
                        <button
                           className={`uppercase mr-8 pb-2 text-xl border-b-4 ${
                              selectedDestination.name === destination.name
                                 ? "border-b-white"
                                 : "border-b-transparent"
                           } transition-colors hover:border-b-white/50 max-[1280px]:text-lg max-lg:m-0 max-sm:text-sm`}
                           key={destination.name}
                           onClick={() => handleClick(destination.name)}
                        >
                           {destination.name}
                        </button>
                     ))}
               </div>
               <div>
                  <h2 className="uppercase my-6 font-bellefair text-8xl text-white max-[1280px]:text-6xl">
                     {selectedDestination.name || "Moon"}
                  </h2>
                  <p className="leading-7">
                     {selectedDestination.description ||
                        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites."}
                  </p>
               </div>
               <div className="flex mt-12 pt-6 border-t-2 border-t-white/30">
                  <div className="w-full flex flex-col gap-1">
                     <span className="uppercase text-sm">Avg. Distance</span>
                     <span className="text-3xl font-bellefair text-white uppercase">{selectedDestination.distance || "384,400 km"}</span>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                     <span className="uppercase text-sm">Est. Travel Time</span>
                     <span className="text-3xl font-bellefair text-white uppercase">{selectedDestination.travel || "3 days"}</span>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Destination;

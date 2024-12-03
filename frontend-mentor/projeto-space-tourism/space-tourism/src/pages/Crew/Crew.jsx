import { useState, useContext } from "react";
import { DataContext } from "../../components/DataContext";

import Douglas from "../../assets/crew/image-douglas-hurley.png";
import Mark from "../../assets/crew/image-mark-shuttleworth.png";
import Victor from "../../assets/crew/image-victor-glover.png";
import Anousheh from "../../assets/crew/image-anousheh-ansari.png";

const Crew = () => {
   const { crew } = useContext(DataContext);
   const [selectedCrew, setSelectedCrew] = useState("Douglas Hurley");

   const images = {
      "Douglas Hurley": Douglas,
      "Mark Shuttleworth": Mark,
      "Victor Glover": Victor,
      "Anousheh Ansari": Anousheh,
   };

   const handleClick = crewName => {
      const member = crew.find(member => member.name === crewName);
      setSelectedCrew(member);
   };

   return (
      <main className="w-[80%] max-w-[1350px] min-h-custom mx-auto flex flex-col text-textColor max-xl:w-[90%] max-[468px]:w-full">
         <h1 className="self-start text-3xl uppercase text-white mt-12  max-lg:w-full max-lg:text-center max-lg:mb-14 max-sm:text-2xl">
            <span className="mr-4 font-bold text-white/25">02</span>
            Meet your crew
         </h1>
         <div className="flex justify-around gap-20 max-[1280px]:mt-10 max-[1280px]:gap-10 max-lg:flex-col max-sm:flex-col-reverse max-lg:items-center max-sm:mb-12 max-lg:gap-20">
            <div className="flex flex-col justify-around max-sm:flex-col-reverse max-lg:gap-14 max-[468px]:mx-4">
               <div className="max-lg:mb-14 max-lg:text-center">
                  <h3 className="uppercase text-3xl font-bellefair text-white/40 max-[1280px]:text-2xl max-lg:text-3xl">
                     {selectedCrew.role || "Commander"}
                  </h3>
                  <h2 className="uppercase my-6 font-bellefair text-5xl text-white max-[1280px]:text-4xl max-lg:text-5xl">
                     {selectedCrew.name || "Douglas Hurley"}
                  </h2>
                  <p className="leading-7">
                     {selectedCrew.bio ||
                        "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."}
                  </p>
               </div>
               <div className="max-lg:flex max-lg:justify-center max-lg:gap-12">
                  {crew &&
                     crew.map(member => (
                        <button
                           className={`w-4 h-4 rounded-full uppercase mr-6 ${
                              selectedCrew.name === member.name
                                 ? "bg-white"
                                 : "bg-white/30"
                           } transition-colors hover:border-b-white/50 max-[1280px]:text-lg max-lg:m-0 max-lg:w-6 max-lg:h-6 max-sm:text-sm`}
                           key={member.name}
                           onClick={() => handleClick(member.name)}
                        ></button>
                     ))}
               </div>
            </div>
            <img
               className="lg:h-[700px] object-bottom max-sm:w-full"
               src={images[selectedCrew.name] || Douglas}
               alt={selectedCrew.name || "Douglas Hurley"}
            />
         </div>
      </main>
   );
};

export default Crew;

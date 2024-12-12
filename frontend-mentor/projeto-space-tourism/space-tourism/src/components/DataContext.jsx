import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [destinations, setDestinations] = useState([]);
   const [crew, setCrew] = useState([])
   const [technology, setTechnology] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch("../../public/data/data.json");
         const data = await response.json();

         setDestinations(data.destinations);
         setCrew(data.crew);
         setTechnology(data.technology)
      }

      fetchData();
   }, []);

   return (
      <DataContext.Provider value={{destinations, crew, technology}}>
         {children}
      </DataContext.Provider>
   );
};

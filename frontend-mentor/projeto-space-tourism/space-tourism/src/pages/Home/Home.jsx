import { useNavigate } from "react-router-dom";

const Home = ({ setActiveLink }) => {
   const navigate = useNavigate();

   const handleExploreClick = () => {
      setActiveLink("destination");
      navigate("/destination");
   };

   return (
      <main className="min-h-custom flex items-center justify-around max-lg:flex-col max-lg:text-center max-lg:mt-12">
         <div className="w-[600px]">
            <h1 className="text-2xl text-textColor uppercase tracking-wider max-lg:text-lg">
               So, you want to travel to
               <br />
            </h1>
            <span className="block uppercase font-bellefair text-white text-[140px] max-lg:text-9xl max-lg:py-6 max-lg:w-full">
               Space
            </span>
            <p className="text-textColor max-lg:w-[72%] max-lg:block max-lg:mx-auto">
               Let’s face it; if you want to go to space, you might as well
               genuinely go to outer space and not hover kind of on the edge of
               it. Well sit back, and relax because we’ll give you a truly out
               of this world experience!
            </p>
         </div>
         <button
            onClick={handleExploreClick}
            className="w-72 h-72 rounded-full bg-white text-4xl uppercase font-bellefair cursor-pointer transition-all hover:shadow-curstomShadow hover:text-textColor max-lg:w-60 max-lg:h-60"
         >
            Explore
         </button>
      </main>
   );
};

export default Home;

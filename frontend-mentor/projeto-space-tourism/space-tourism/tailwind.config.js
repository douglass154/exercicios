/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,jsx}"],
   theme: {
      extend: {
         colors: {
            textColor: "#D0D6F9",
         },
         fontFamily: {
            bellefair: ["Bellefair", "serif"],
         },
         keyframes: {
            showNavbar: {
               "0%": {
                  right: "-100%",
               },
               "100%": {
                  right: "0",
               },
            },
            hideNavbar: {
               "0%": {
                  right: "0",
               },
               "100%": {
                  right: "-100%",
               },
            },
         },
         animation: {
            showNavbar: "showNavbar 0.4s ease-out",
            hideNavbar: "hideNavbar 0.4s ease-in",
         },
         minHeight: {
            custom: 'calc(100vh - 192px)'
         },
         boxShadow: {
            curstomShadow: '0 0 0 50px rgba(255, 255, 255, 0.145)'
         }
      },
   },
   plugins: [],
};

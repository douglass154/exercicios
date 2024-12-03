import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App.jsx";
import { DataProvider } from "./components/DataContext.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <DataProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </DataProvider>
   </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NameContext from "./NameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NameContext.Provider value="Rehan">
    <App />
  </NameContext.Provider>
);

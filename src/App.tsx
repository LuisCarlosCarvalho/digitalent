import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import InscricaoPage from "./components/InscricaoPage";
import "./index.css";

function App() {
  const getRoute = () => {
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const pParam = searchParams.get("p") || searchParams.get("page");

    if (
      pathname === "/inscricao" ||
      hash === "#/inscricao" ||
      hash === "#inscricao" ||
      pParam === "inscricao"
    ) {
      return "inscricao";
    }
    return "home";
  };

  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRoute());
    };
    
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      setRoute(getRoute());
    };

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
      window.history.pushState = originalPushState;
    };
  }, []);

  return (
    <div className="App">
      {route === "inscricao" ? <InscricaoPage /> : <LandingPage />}
    </div>
  );
}

export default App;



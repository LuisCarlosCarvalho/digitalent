import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import ThankYouPage from "./components/ThankYouPage";
import InscricaoPage from "./components/InscricaoPage";
import SpeakersRegistration from "./components/sections/SpeakersRegistration";
import ParticipantRegistration from "./components/sections/ParticipantRegistration";
import PartnerRegistration from "./components/sections/PartnerRegistration";
import AdminPortal from "./components/AdminPortal";
import CheckinPage from "./components/CheckinPage";
import "./index.css";

function App() {
  const getRoute = () => {
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const pParam = searchParams.get("p") || searchParams.get("page");

    if (
      pathname === "/inscricao" ||
      pathname === "/insc" ||
      hash === "#/inscricao" ||
      hash === "#/insc" ||
      hash === "#inscricao" ||
      hash === "#insc" ||
      pParam === "inscricao" ||
      pParam === "insc"
    ) {
      return "inscricao";
    }

    if (
      pathname === "/oradores" ||
      hash === "#/oradores" ||
      pParam === "oradores"
    ) {
      return "oradores";
    }

    if (
      pathname === "/participante" ||
      hash === "#/participante" ||
      hash === "#participante" ||
      pParam === "participante"
    ) {
      return "participante";
    }

    if (
      pathname === "/parceiro" ||
      hash === "#/parceiro" ||
      hash === "#parceiro" ||
      pParam === "parceiro"
    ) {
      return "parceiro";
    }

    if (pathname === "/confirma" || pParam === "confirma") {
      return "confirma";
    }

    if (pathname === "/checkin" || pParam === "checkin" || pathname === "/check-in") {
      return "checkin";
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
      {route === "inscricao" ? <InscricaoPage /> : 
       route === "oradores" ? <SpeakersRegistration /> : 
       route === "participante" ? <ParticipantRegistration /> :
       route === "parceiro" ? <PartnerRegistration /> : null}
      {route === "confirma" && <AdminPortal />}
      {route === "checkin" && <CheckinPage />}
      {route === "home" && <ThankYouPage />}
    </div>
  );
}

export default App;

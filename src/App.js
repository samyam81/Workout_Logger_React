import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./Error";
import NavBar from "./NavBar";
import Home from "./Home";
import How from "./How";
import Contact from "./Contact";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <div>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/how" element={<How />} />
            <Route path="/contact" element={<Contact/>} />
            </Routes>
          </Router>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}

export default App;

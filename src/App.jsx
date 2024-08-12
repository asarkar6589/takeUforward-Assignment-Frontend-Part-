import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Update from "./components/Update/Update";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [response, setResponse] = useState({});
  const [showBanner, setShowBanner] = useState(true);

  const handleHideBanner = () => {
    setShowBanner(false);
  };

  const fetchData = () => {
    let url = `${import.meta.env.VITE_BACKEND_URL}/all`;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/all`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          if (data.records) {
            setResponse(data.records[0]);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, [showBanner]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              response={response}
              handleHideBanner={handleHideBanner}
              showBanner={showBanner}
            />
          }
        />
        <Route
          path="/update/:id"
          element={
            response?.banner_timer && (
              <Update
                fetchData={fetchData}
                showBanner={showBanner}
                response={response}
              />
            )
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

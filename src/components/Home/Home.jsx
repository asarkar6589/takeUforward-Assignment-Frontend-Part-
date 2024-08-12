import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Dashboard from "../Dashboard/Dashboard";

function Home({ response, handleHideBanner, showBanner }) {
  let heading = "takeUforward SWE (Full Time) Hiring Assignment";
  const [description, SetDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (response) {
      SetDescription(response.banner_description);
      setVisible(response.banner_on_off === 1 ? true : false);
      setTimer(response.banner_timer);
      setLink(response.banner_link);
    }
  }, [response]);

  return (
    <div className="App">
      <div className="content">
        <div>
          <h1>{heading}</h1>
        </div>

        <div>
          {/* 2 days we have to pass in miliseconds -> 2 * 24 * 60 * 60 * 1000 */}
          {timer && showBanner && visible && (
            <Banner
              // duration={Number(response?.banner_timer)}
              duration={timer}
              onHide={handleHideBanner}
              banner_description={description}
              banner_link={link}
            />
          )}
        </div>

        <div>
          {response?.banner_timer && (
            <Dashboard response={response} showBanner={showBanner} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

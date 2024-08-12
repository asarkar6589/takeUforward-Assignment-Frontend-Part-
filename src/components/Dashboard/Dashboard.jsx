import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ response, showBanner }) => {
  const [bannerVisibility, setBannerVisibility] = useState();
  const [bannerDescription, setBannerDescription] = useState();
  const [bannerLink, setBannerLink] = useState();
  const [timer, setTimer] = useState();

  //   console.log(showBanner);

  useEffect(() => {
    if (response) {
      setBannerVisibility(response.banner_on_off === 0 ? false : true);
      setBannerDescription(response.banner_description);
      setBannerLink(response.banner_link);
      setTimer(response.banner_timer);
    }
  }, [response]);

  return (
    <>
      {response && (
        <div className="dashboard">
          <h1>Banner Dashboard</h1>
          <table className="banner-table">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Banner On/Off</td>
                <td>{response.banner_on_off == 1 ? "Visible" : "Hidden"}</td>
              </tr>
              <tr>
                <td>Banner Description</td>
                <td>{bannerDescription}</td>
              </tr>
              <tr>
                <td>Banner Timer</td>
                <td>
                  <div className="timer-container">{timer} ms</div>
                </td>
              </tr>
              <tr>
                <td>Banner Link</td>
                <td>{bannerLink}</td>
              </tr>
            </tbody>
          </table>

          <Link to={`/update/${response.id}`} className="button">
            Update Settings
          </Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./Update.css";

const Update = ({ response, showBanner, fetchData }) => {
  const [bannerVisibility, setBannerVisibility] = useState();
  const [bannerDescription, setBannerDescription] = useState();
  const [bannerLink, setBannerLink] = useState();
  const [timer, setTimer] = useState();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [update, setIsUpdate] = useState(false);

  useEffect(() => {
    if (response) {
      setBannerVisibility(response.banner_on_off === 0 ? false : true);
      setBannerDescription(response.banner_description);
      setBannerLink(response.banner_link);
      setTimer(response.banner_timer);
    }
  }, [response]);

  const data = {
    banner_on_off: showBanner && bannerVisibility ? 1 : 0,
    banner_description: bannerDescription,
    banner_link: bannerLink,
    banner_timer: timer,
  };

  const handleSubmit = (e) => {
    let url = `${import.meta.env.VITE_BACKEND_URL}/update/${id}`;
    e.preventDefault();

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          if (res?.success) {
            setIsUpdate(true);
            toast.success(res.message);
            fetchData();
          } else {
            setIsUpdate(false);
            toast.error(res.message);
          }
        }
      })
      .catch((e) => e);
  };

  if (update) {
    return <Navigate to="/" />;
  }

  return (
    response?.banner_timer && (
      <div className="dashboard">
        <h1>Banner Settings</h1>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bannerVisibility">Banner On/Off</label>
            <input
              type="checkbox"
              id="bannerVisibility"
              checked={bannerVisibility}
              onChange={() => setBannerVisibility(!bannerVisibility)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bannerDescription">Banner Description</label>
            <input
              type="text"
              id="bannerDescription"
              value={bannerDescription}
              onChange={(e) => setBannerDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timer">Banner Timer (miliseconds)</label>
            <div className="timer-container">
              <input
                type="number"
                id="timer"
                value={timer}
                onChange={(e) => setTimer(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bannerLink">Banner Link</label>
            <input
              type="text"
              id="bannerLink"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
            />
          </div>
          <button type="submit">Update Settings</button>
        </form>
      </div>
    )
  );
};

export default Update;

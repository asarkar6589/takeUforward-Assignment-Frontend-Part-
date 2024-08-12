import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = ({ duration, onHide, banner_description, banner_link }) => {
  //   console.log(duration);

  const [time, setTime] = useState(Number(duration));

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1000), 1000);
      return () => clearTimeout(timer);
    } else {
      onHide();
    }
  }, [time, onHide]);

  const getFormatedTime = (milliseconds) => {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinutes / 60));
    let totalDays = parseInt(Math.floor(totalHours / 24));

    let seconds = parseInt(totalSeconds % 60); // it will again start from 60
    let minutes = parseInt(totalMinutes % 60); // it will again start from 60
    let hours = parseInt(totalHours % 24); // it will again start from 60

    return `${totalDays} : ${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <a href={banner_link} target="_blank">
      <div className="banner">
        <div className="banner-content">
          <div>
            <div>{banner_description}</div>

            <div>
              <span id="countdown">{getFormatedTime(time)}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Banner;

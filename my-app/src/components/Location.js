/*global kakao*/
import React, { useEffect } from "react";
// import axios from "axios";

const Location = () => {
  useEffect(() => {
    // const get_data = async () => {
    //   const data = await axios.get("http://extreme-ip-lookup.com/json");
    //   setLat(Number(data.data.lat));
    //   setLon(Number(data.data.lon));
    // };
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // setLat(Number(position.coords.latitude).toFixed(4));
            // setLon(Number(position.coords.longitude).toFixed(4));
            var options = {
              center: new kakao.maps.LatLng(
                Number(position.coords.latitude).toFixed(5),
                Number(position.coords.longitude).toFixed(5)
              ),
              level: 3,
            };
            var container = document.getElementById("map");
            console.log("making");

            var map = new kakao.maps.Map(container, options);
            console.log("Location Find");
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        // get_data();
      }
    };
    getLocation();
  }, []);

  return (
    <div style={{ justifyContent: "center" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default Location;

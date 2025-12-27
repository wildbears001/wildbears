// // 

// import React from 'react';
// import './SplashScreen.css';
// import logo from '../assets/logo.png'; // Replace with your logo image path

// const SplashScreen = () => {
//   return (
//     <div className="splash-screen">
//       <img src={logo} alt="Logo" className="logo-animate" />
//     </div>
//   );
// };

// export default SplashScreen;


import React from "react";
import "./SplashScreen.css";
import splashVideo from "../assets/preloader.mp4"; // ✅ your MP4 file

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <video
        className="logo-animate"
        src={splashVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default SplashScreen;

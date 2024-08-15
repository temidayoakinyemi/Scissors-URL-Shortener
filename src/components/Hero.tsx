import React from "react";
import "./Hero.css";
import { Link as RouterLink } from "react-router-dom";
const Hero: React.FC = () => { 
     return (
       <div className="hero container">
         <div className="hero-text">
           <h1>
             Shorten Your <br /> Links with Ease
           </h1>
           <p>
             Transform long URLs into short, easy-to-share links. <br /> Perfect
             for social media, emails, and more.
           </p>
           <RouterLink to="/register">
             <button className="btn dark-btn">Get Started</button>
           </RouterLink>
         </div>
       </div>
     );
}

export default Hero
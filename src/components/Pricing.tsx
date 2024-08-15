import React from "react";
import "./Pricing.css";
import check from "../assets/check.svg"
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
     return (
       <div className="pricing-container">
         <h1 className="pricing-title">Our Pricing</h1>
         <div className="all-price">
           <div className="pricing-card">
             <h1>Basic</h1>
             <h2>Free</h2>
             <div className="all">
               <img src={check} alt="" />
               <p>Unlimited URL Shortening</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Basic Link Analytics</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Customizable Short Links</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Standard Support</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Ad-supported</p>
             </div>
             <RouterLink to="/register">
               <button className="Pricing-btn">Get Started</button>
             </RouterLink>
           </div>
           <div className="pricing-card">
             <h1>Professional</h1>
             <h2>$15/month</h2>
             <h3>Ideal for business creators</h3>
             <div className="all">
               <img src={check} alt="" />
               <p>Enhanced Link Analytics</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Custom Branded Domains</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Advanced Link Customization</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Priority Support</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Ad-free Experience</p>
             </div>
             <RouterLink to="/register">
               <button className="Pricing-btn">Get Started</button>
             </RouterLink>
           </div>
           <div className="pricing-card">
             <h1>Teams</h1>
             <h2>$25/month</h2>
             <h3>Share With up to 10 users.</h3>
             <div className="all">
               <img src={check} alt="" />
               <p>Team Collaboration</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>User Roles and Permissions</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Enhanced Security</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Api Acess</p>
             </div>
             <div className="all">
               <img src={check} alt="" />
               <p>Dedicated Account Manager</p>
             </div>
             <RouterLink to="/register">
               <button className="Pricing-btn">Get Started</button>
             </RouterLink>
           </div>
         </div>
       </div>
     );
}

export default Navbar;

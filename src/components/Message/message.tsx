import React from "react";
import "./message.css";
import { RiMailSendFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Messagepage: React.FC = () => {
  return (
    <div className="mess">
      <RiMailSendFill aria-hidden="true" className="icon-mess-1" />
      <p className="succes">
        Registration successful! <br /> Please check your email for
        verification.
      </p>
      <Link to="/login">
        <button className="button-mess">Login</button>
      </Link>
    </div>
  );
};

export default Messagepage;

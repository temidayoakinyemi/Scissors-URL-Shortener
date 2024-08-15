import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaEnvelope } from "react-icons/fa";
import { RiMailSendFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./page.css"

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email");
      setIsModalOpen(true);
    } catch (err) {
      setError("Please enter a valid email address");
    }
  };

  return (
    <>
      <div className="container-forgot">
        <div className="">
          <h1 className="container-h1-forgot">Forgot Password!</h1>
          <form onSubmit={handleForgotPassword} className="form-forgot">
            <div className="form-di-forgot">
              <label className="label-forgot" htmlFor="email">
                Enter Your Email Address
              </label>
              <div>
                <input
                  className="input-forgot"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email id"
                />
                <FaEnvelope className="icon-forgot" />
              </div>
            </div>
            {message && <p className="sucess-forgot">{message}</p>}
            {error && <p className="error-forgot">{error}</p>}
            <button type="submit" className="button-forgot">
              Send Reset Link
            </button>
          </form>
        </div>
        {isModalOpen && (
          <div>
            <div>
              <div aria-hidden="true">
                <div></div>
              </div>
              <span aria-hidden="true">&#8203;</span>
              <div>
                <div>
                  <div>
                    <div>
                      <h3 className="email-se-forgot">Email Sent</h3>
                      <RiMailSendFill
                        aria-hidden="true"
                        className="icon-forgot-2"
                      />
                      <div>
                        <p className="reset-forgot">
                          A password reset link has been sent to your email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to={"/login"}>
                    <button
                      type="button"
                      className="button-forgot-log"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;

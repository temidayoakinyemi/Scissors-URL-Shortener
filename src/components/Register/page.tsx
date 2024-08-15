import { useState, FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import "../../components/Register/page.css"
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
   const navigate = useNavigate();

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName,
          email,
        })
      );

      navigate("/message")

      setFirstName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unkwon error occurred");
      }
    }
  };

  return (
    <div className="container-sign">
      <h1 className="container-h1">Sign Up</h1>
      <div className="underline-sign"></div>
      <div className="p-5 border border-gray-300 rounded">
        <form onSubmit={handleRegister} className="form">
          <div className="form-di">
            <label htmlFor="Name" className="label">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input-sign"
            />
            <FaUser className="icon" />
          </div>
          <div className="form-di">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email Id"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-sign"
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="form-di">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="Password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-sign"
            />
            <FaLock className="icon" />
          </div>
          <div className="form-di">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-sign"
            />
            <FaLock className="icon" />
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          {/* <Link to="/message" className="link-reg">
            <button type="submit" className="button-sign">
              Sign Up
            </button>
          </Link> */}
          <button type="submit" className="button-sign">
            Sign Up
          </button>
          <p className="dont-reg">
            Already have an account?
            <Link to="/login" className="link-reg">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

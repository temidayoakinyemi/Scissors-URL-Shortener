import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../../components/login/page.css";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

const Loginpage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        const registrationData = localStorage.getItem("registration");
        const {
          firstName = "",
          lastName = "",
          gender = "",
        } = registrationData ? JSON.parse(registrationData) : {};

        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {

          await setDoc(doc(firestore, "users", user.uid), {
            firstName,
            lastName,
            gender,
            email: user.email,
          });
        }

        navigate("/dashboard");
      } else {
        setError("Please verify your email before Logging in.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container-sign-log">
      <h1 className="container-h1-log">Login</h1>
      <div className=" p-5 border border-gray-300 rounded">
        <form onSubmit={handleLogin} className="form">
          <div className="form-di">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              placeholder="Email Id"
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
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button-sign-log-1">
            Login
          </button>
        </form>
          <p className="dont">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </p>
          <p className="dont">
            Forgot Password?
            <Link to="/forgotpassword" className="link">
              Click here
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Loginpage;

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../Dashboard/page.css";
import { useNavigate } from "react-router-dom";
import url_shortener_ from "../../assets/url-shortener-.png";
import link from "../../assets/link.svg";
import qrcode_solid from "../../assets/qrcode-solid.svg";
import arrow_right_from_bracket_solid from "../../assets/arrow-right-from-bracket-solid.svg";
import Dashboardpage2 from "./page2";

const Dashboardpage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => {
    navigate("/ForgotPassword");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="body">
      <nav className="nav-dash">
        <div className="div-1">
          <div className="div-2">
            <div className="div-3">
              <div className="logos">
                <h1 className="shortly">Shortly</h1>
                <img className="logo" src={url_shortener_} alt="" />
              </div>
              <div className="handle">
                <li className="li-dash">
                  <img className="img-li" src={link}></img>Shorten Links
                </li>
                <li className="li-dash">
                  <img className="img-li-1" src={qrcode_solid}></img>QR Code
                </li>
                <button onClick={handleChangePassword} className="btn-change">
                  Change Password
                </button>
                <p onClick={handleLogout} className="logout">
                  <img
                    className="img-li-2"
                    src={arrow_right_from_bracket_solid}
                  />
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Dashboardpage2 />
    </div>
  );
};

export default Dashboardpage;

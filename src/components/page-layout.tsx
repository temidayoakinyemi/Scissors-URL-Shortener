import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;

import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import URLShortener from "./components/URLShortener";
import RegisterPage from "./components/Register/page";
import Loginpage from "./components/login/page";
import { Route, Routes } from "react-router-dom";
import Dashboardpage from "./components/Dashboard/page";
import ForgotPassword from "./components/ForgotPassword/page";
import PageLayout from "./components/page-layout";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Pricing />
                <URLShortener />
              </>
            }
          />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>
        <Route path="/dashboard" element={<Dashboardpage />} />
      </Routes>
    </div>
  );
};

export default App;

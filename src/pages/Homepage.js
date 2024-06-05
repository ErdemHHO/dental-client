import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Teeth from "../components/Teeth";

function Homepage() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")).user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <br />
      <Navbar />
      <Teeth />
      <Footer />
    </div>
  );
}

export default Homepage;

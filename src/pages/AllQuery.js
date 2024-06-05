import React from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import QueryResults from "../components/QueryResults";

function AllQuery() {
  return (
    <div>
      <div>
        <Navbar />
        <QueryResults />
        <Footer />
      </div>
    </div>
  );
}

export default AllQuery;

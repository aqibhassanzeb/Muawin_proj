import React from "react";
import Navbar from "../common/navbar";
import Sidenav from "../common/sidenav";
import Header from "../common/header";
import Footer from "../common/footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <Header />
      <Footer />
    </div>
  );
};

export default Dashboard;

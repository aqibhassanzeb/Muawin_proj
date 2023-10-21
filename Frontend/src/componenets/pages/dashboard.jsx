import React from "react";
import Navbar from "../common/navbar";
import Header from "../common/header";
import Footer from "../common/footer";
import PersistentDrawerLeft from "../common/sidenav";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <PersistentDrawerLeft />
      <Header />
      <Footer />
    </div>
  );
};

export default Dashboard;

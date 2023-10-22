import React, { useState } from "react";
import Footer from "../common/footer";
import Navbar from "../common/navbar";

import { Link } from "react-router-dom";
import States from "../../constants/States.json";
import { useLazyGetCitiesQuery } from "../../api/api";
import MemberForm from "../MemberForm";

const MemberManagement = () => {
  return (
    <div className="wrapper">
      <Navbar />
      {/* <Sidenav /> */}

      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add Member</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">Add Member</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <MemberForm />
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default MemberManagement;

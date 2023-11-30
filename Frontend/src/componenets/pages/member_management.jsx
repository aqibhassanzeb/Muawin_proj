import React, { useState } from "react";
import Footer from "../common/footer";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";
import NotAuth from "./notauth";
import MemberForm from "../MemberForm";
import { useSelector } from "react-redux";

const MemberManagement = () => {
  const permissions = useSelector((state) => state.authReducer.permissions);
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
                {permissions.includes("create") ? <h1>Add Member</h1> : null}
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
        {permissions.includes("create") ? (
          <MemberForm />
        ) : (
          <div style={{ minHeight: "73vh" }}>
            <NotAuth />
          </div>
        )}
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default MemberManagement;

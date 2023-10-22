import React from "react";
import "../css/don.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";

function Donations() {
  const donations = [
    {
      name: "USAID",
      amount: "$1000",
      date: "2023-06-15",
      address: "123 Main St, City",
      focalPerson: "John Doe",
      contactInfo: "john.doe@example.com",
    },
    {
      name: "NITB",
      amount: "$500",
      date: "2023-06-20",
      address: "456 Elm St, City",
      focalPerson: "Jane Smith",
      contactInfo: "jane.smith@example.com",
    },
    {
      name: "NIC",
      amount: "$1500",
      date: "2023-07-01",
      address: "789 Oak St, City",
      focalPerson: "Michael Johnson",
      contactInfo: "michael.johnson@example.com",
    },
    // Add more donation objects as needed
  ];

  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "84vh" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Donations</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Donations</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="donations-container">
          {donations.map((donation, index) => (
            <div key={index} className="donation-card">
              <h2 className="organization-name">{donation.name}</h2>
              <div className="donation-info">
                <p>
                  <strong>Amount Donated:</strong> {donation.amount}
                </p>
                <p>
                  <strong>Date:</strong> {donation.date}
                </p>
                <p>
                  <strong>Address:</strong> {donation.address}
                </p>
                <p>
                  <strong>Focal Person:</strong> {donation.focalPerson}
                </p>
                <p>
                  <strong>Contact Info:</strong> {donation.contactInfo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donations;

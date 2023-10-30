import React, { useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { convertMinutes } from "../../utils/index";
import { baseURL } from "../../api/api";
import axios from "axios";
import Loader from "../Loader";
import { toast } from "sonner";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e) => {
    // Assuming the date format is YYYY-MM-DD
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleReportFormatChange = (e) => {
    setReportFormat(e.target.value);
  };

  const handleGenerateReport = () => {
    if(!startDate || !endDate){
      return toast.error("please fill dates")
    }
    const unixStartDate = moment(startDate).unix();
    const unixEndDate = moment(endDate).unix();
    setIsLoading(true);
    axios
      .get(`${baseURL}/event/pdf`, {
        params: { startDate: unixStartDate, endDate: unixEndDate },
      })
      .then((response) => {
        setIsLoading(false);
        const data = response.data;
        if (reportFormat === "pdf") {
          const report = new jsPDF("portrait", "pt", "a4");
          const image = new Image();
          image.src = "dist/img/Muawin-Logo.png";
          report.addImage(image, "PNG", 30, 8, 50, 50);
          report.text("Events Report", 80, 40);
          const headers = [
            [
              "S.No",
              "Name",
              "Description",
              "Event Venue",
              "Event Date",
              "Event Leader",
              "Budget",
              "Spent",
              "Duration",
            ],
          ];
          const tableData = data.map((event, index) => [
            index + 1,
            event.name,
            event.description,
            event.venue,
            moment.unix(event?.date).format("Do MMMM YYYY, h:mm a"),
            event.leader,
            event.budget,
            event.spent,
            convertMinutes(event.duration),
          ]);

          report.autoTable({
            head: headers,
            body: tableData,
            startY: 50,
            styles: {
              fontSize: 8,
            },
          });

          report.save("events_report.pdf");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const hasError = false;
  if (hasError) {
    alert(
      "An error occurred while generating the report. Please contact muawin support."
    );
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "84vh" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Reports and Analytics</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Reports</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <div className="container">
          <div className="filters">
            <label htmlFor="startDate">From:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
            />
            <label htmlFor="endDate">To:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
            />
            <label htmlFor="reportFormat">Report Format:</label>
            <select
              id="reportFormat"
              name="reportFormat"
              value={reportFormat}
              onChange={handleReportFormatChange}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>

            {isLoading ? (
              <Loader />
            ) : (
              <button id="report" onClick={handleGenerateReport}>
                Get Report
              </button>
            )}
          </div>
          <p className="error-note">
            If you encounter any errors while generating the report, please
            contact muawin support for assistance.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Report;

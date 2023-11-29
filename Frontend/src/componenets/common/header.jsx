import React from "react";
import { Link } from "react-router-dom";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { Chart as GoogleChart } from "react-google-charts";
import Todos from "../Todos";
import EventsCalendar from "../EventsCalendar";
import {
  useCalendarEventsQuery,
  useGetAllUsersCountQuery,
  useGetDonationsCountQuery,
  useGetStatsQuery,
  useGetTodosCountQuery,
} from "../../api/api";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
  datasets: [
    {
      data: [20, 30, 25, 15, 10],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
    },
  ],
};

const Header = () => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery();
  const { data: events, isLoading: eventsLoading } = useCalendarEventsQuery();
  const { data: userCount, isLoading: userCountLoading } =
    useGetAllUsersCountQuery();
  const { data: todoCount, isLoading: todoCountLoading } =
    useGetTodosCountQuery();
  const { data: donationCount, isLoading: donationLoading } =
    useGetDonationsCountQuery();

  return (
    <div>
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              {user?.role !== "muawin" && (
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>
                        {userCountLoading ? (
                          <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                        ) : (
                          userCount
                        )}
                      </h3>
                      <p>
                        Total {user?.role === "admin" ? "Users" : "Muawin's"}
                      </p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <Link to="/directory" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              )}
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      {donationLoading ? (
                        <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                      ) : (
                        donationCount
                      )}
                    </h3>
                    <p>Open Donations</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-donate" />
                  </div>
                  <Link to="/donations" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner" style={{ color: "white" }}>
                    <h3>
                      {todoCountLoading ? (
                        <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                      ) : (
                        todoCount
                      )}
                    </h3>
                    <p>Incomplete Tasks</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <a className="small-box-footer">
                    <i
                      className="fas fa-arrow-circle-down"
                      style={{ color: "white" }}
                    />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>
                      {eventsLoading ? (
                        <HourglassEmptyRoundedIcon style={{ fontSize: 30 }} />
                      ) : (
                        events?.length
                      )}
                    </h3>
                    <p>Events</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <Link to="/eventdirectory" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
              {/* Left col */}
              <section className="col-lg-7 connectedSortable">
                {/* Custom tabs (Charts with tabs)*/}
                {user?.role === "admin" && (
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fas fa-chart-pie mr-1" />
                        Demographics
                      </h3>
                      <div className="card-tools">
                        <ul className="nav nav-pills ml-auto">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              href="#revenue-chart"
                              data-toggle="tab"
                            >
                              Area
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#sales-chart"
                              data-toggle="tab"
                            >
                              Donut
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div
                      className="card-body"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <div
                        style={{
                          width: "55vh",
                          height: "55vh",
                        }}
                      >
                        <Pie data={data} />
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                )}
                {/* /.card */}
                {/* DIRECT CHAT */}
                {/* <div className="card direct-chat direct-chat-primary">
                  <div className="card-header">
                    <h3 className="card-title">Direct Chat</h3>
                    <div className="card-tools">
                      <span
                        title="3 New Messages"
                        className="badge badge-primary"
                      >
                        3
                      </span>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        title="Contacts"
                        data-widget="chat-pane-toggle"
                      >
                        <i className="fas fa-comments" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="direct-chat-messages">
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">
                            Abdul Sami
                          </span>
                          <span className="direct-chat-timestamp float-right">
                            23 Jan 2:00 pm
                          </span>
                        </div>
                        <img
                          className="direct-chat-img"
                          src="dist/img/user1-128x128.jpg"
                          alt="message user image"
                        />
                        <div className="direct-chat-text">Hi!</div>
                      </div>
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">
                            Hassan Ali
                          </span>
                          <span className="direct-chat-timestamp float-left">
                            23 Jan 2:05 pm
                          </span>
                        </div>
                        <img
                          className="direct-chat-img"
                          src="dist/img/user3-128x128.jpg"
                          alt="message user image"
                        />
                        <div className="direct-chat-text">Hello Dear</div>
                      </div>
              
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">
                            Abdul Sami
                          </span>
                          <span className="direct-chat-timestamp float-right">
                            23 Jan 5:37 pm
                          </span>
                        </div>
                        <img
                          className="direct-chat-img"
                          src="dist/img/user1-128x128.jpg"
                          alt="message user image"
                        />
                        <div className="direct-chat-text">How are You?</div>
                      </div>
                     
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">
                            Hassan Ali
                          </span>
                          <span className="direct-chat-timestamp float-left">
                            23 Jan 6:10 pm
                          </span>
                        </div>
                        <img
                          className="direct-chat-img"
                          src="dist/img/user3-128x128.jpg"
                          alt="message user image"
                        />
                        <div className="direct-chat-text">I'm fine.</div>
                      </div>
                    </div>
                    <div className="direct-chat-contacts">
                      <ul className="contacts-list">
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user1-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Count Dracula
                                <small className="contacts-list-date float-right">
                                  2/28/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                How have you been? I was...
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user7-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Sarah Doe
                                <small className="contacts-list-date float-right">
                                  2/23/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                I will be waiting for...
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user3-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nadia Jolie
                                <small className="contacts-list-date float-right">
                                  2/20/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                I'll call you back at...
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user5-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nora S. Vans
                                <small className="contacts-list-date float-right">
                                  2/10/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Where is your new...
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user6-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                John K.
                                <small className="contacts-list-date float-right">
                                  1/27/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Can I take a look at...
                              </span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              className="contacts-list-img"
                              src="dist/img/user8-128x128.jpg"
                              alt="User Avatar"
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Kenneth M.
                                <small className="contacts-list-date float-right">
                                  1/4/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Never mind I found...
                              </span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <form action="#" method="post">
                      <div className="input-group">
                        <input
                          type="text"
                          name="message"
                          placeholder="Type Message ..."
                          className="form-control"
                        />
                        <span className="input-group-append">
                          <button type="button" className="btn btn-primary">
                            Send
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div> */}
                {/*/.direct-chat */}
                {/* TO DO List */}
                <Todos />
                {/* /.card */}
              </section>
              {/* /.Left col */}
              {/* right col (We are only adding the ID to make the widgets sortable)*/}
              <section className="col-lg-5 connectedSortable">
                {/* Map card */}
                {user?.role === "admin" && (
                  <div className="card ">
                    <div className="card-header border-0">
                      <h3 className="card-title">
                        <i className="fas fa-map-marker-alt mr-1" />
                        Visitors
                      </h3>
                      {/* card tools */}
                      <div className="card-tools">
                        {/* <button
                        type="button"
                        className="btn btn-primary btn-sm daterange"
                        title="Date range"
                      >
                        <i className="far fa-calendar-alt" />
                      </button> */}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-card-widget="collapse"
                          title="Collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                      </div>
                      {/* /.card-tools */}
                    </div>
                    <div className="card-body">
                      {/* <div
                      id="world-map"
                      style={{ height: 250, width: "100%" }}
                    /> */}
                      <GoogleChart
                        chartEvents={[
                          {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                              const chart = chartWrapper.getChart();
                              const selection = chart.getSelection();
                              if (selection.length === 0) return;
                              const region =
                                statsData &&
                                statsData?.chartData[selection[0].row + 1];
                              console.log("Selected : " + region);
                            },
                          },
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="200px"
                        data={statsData && statsData?.chartData}
                        style={{ backgroundColor: "white" }}
                      />
                    </div>
                    {/* /.card-body*/}
                    <div className="card-footer ">
                      <div className="row">
                        <div className="col-4 text-center">
                          <div id="sparkline-1" />
                          <div className="">
                            Today Visitors{" "}
                            <span style={{ fontWeight: 600 }}>
                              {statsData && statsData.loginsCount.length}
                            </span>
                          </div>
                        </div>
                        {/* ./col */}
                        {/* <div className="col-4 text-center">
                        <div id="sparkline-2" />
                        <div className="">Online</div>
                      </div> */}
                        {/* ./col */}

                        {/* ./col */}
                      </div>
                      {/* /.row */}
                    </div>
                  </div>
                )}
                {/* /.card */}
                {/* solid sales graph */}
                {/* <div className="card bg-gradient-info">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-th mr-1" />
                      Analytics
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn bg-info btn-sm"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn bg-info btn-sm"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas
                      className="chart"
                      id="line-chart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={20}
                          data-width={60}
                          data-height={60}
                          data-fgcolor="#39CCCC"
                        />
                        <div className="text-white">Active Users</div>
                      </div>
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={50}
                          data-width={60}
                          data-height={60}
                          data-fgcolor="#39CCCC"
                        />
                        <div className="text-white">Upcoming Events</div>
                      </div>

                    </div>
                  </div>
                </div> */}
                {/* /.card */}
                {/* Calendar */}
                <EventsCalendar events={events} />
                {/* /.card */}
              </section>
              {/* right col */}
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Header;

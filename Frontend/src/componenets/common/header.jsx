import React, { useState } from "react";
import EventsCalendar from "../EventsCalendar";
import { Link } from "react-router-dom";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import {
  useAddTodoMutation,
  useCalendarEventsQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../api/api";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../Loader";

export const data = [
  ["Country", "Visitors"],
  ["Germany", 1],
  ["United States", 2],
  ["Brazil", 1],
  ["Canada", 2],
  ["France", 1],
  ["RU", 1],
  ["Pakistan", 2],
];

const Header = () => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const { data: events, isLoading: eventsLoading } = useCalendarEventsQuery();
  const { data: todos } = useGetTodosQuery(user._id);
  const [addTodo, todoResponse] = useAddTodoMutation();
  const [updateTodo, updateResponse] = useUpdateTodoMutation();

  const [todoText, setTodoText] = useState("");

  function handleAddTodo() {
    if (todoText.length > 0) {
      addTodo({ text: todoText }).then(() => setTodoText(""));
    }
  }

  console.log(todos);

  const toggleComplete = (id, value) => {
    console.log(id, value);
    updateTodo({ id, data: { isCompleted: value } });
    // const updatedTodos = [...todos];
    // updatedTodos[index].completed = !updatedTodos[index].completed;
    // setTodos(updatedTodos);
  };

  return (
    <div>
      <div className="content-wrapper">
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
                  <li className="breadcrumb-item active">Dashboard</li>
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
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>Total User</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="/directory" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      53<sup style={{ fontSize: 20 }}>%</sup>
                    </h3>
                    <p>My Reports</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="/reports" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="/membermanagement" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
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
                  <div className="card-body">
                    <div className="tab-content p-0">
                      {/* Morris chart - Sales */}
                      <div
                        className="chart tab-pane active"
                        id="revenue-chart"
                        style={{ position: "relative", height: 300 }}
                      >
                        <canvas
                          id="revenue-chart-canvas"
                          height={300}
                          style={{ height: 300 }}
                        />
                      </div>
                      <div
                        className="chart tab-pane"
                        id="sales-chart"
                        style={{ position: "relative", height: 300 }}
                      >
                        <canvas
                          id="sales-chart-canvas"
                          height={300}
                          style={{ height: 300 }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
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
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="ion ion-clipboard mr-1" />
                      To Do List
                    </h3>
                    <div className="card-tools">
                      <ul className="pagination pagination-sm">
                        <li className="page-item">
                          <a href="#" className="page-link">
                            «
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            »
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <ul className="todo-list" data-widget="todo-list">
                      {todos?.todos?.map((todo) => (
                        <li key={todo._id}>
                          {/* drag handle */}
                          <span className="">
                            <i className="fas fa-ellipsis-v" />
                            <i className="fas fa-ellipsis-v" />
                          </span>
                          {/* checkbox */}
                          <div className=" d-inline ml-2">
                            <input
                              type="checkbox"
                              // defaultChecked={todo.isCompleted}
                              checked={todo.isCompleted}
                              onChange={(e) =>
                                toggleComplete(todo._id, e.target.checked)
                              }
                            />
                            <label htmlFor="todoCheck1" />
                          </div>
                          {/* todo text */}
                          <span
                            className="text"
                            style={{
                              textDecoration:
                                todo.isCompleted && "line-through",
                            }}
                          >
                            {todo.text}
                          </span>
                          {/* Emphasis label */}
                          <small className="badge badge-danger">
                            <i className="far fa-clock" />{" "}
                            {moment(todo.createdAt).fromNow()}
                          </small>
                          {/* General tools such as edit or delete*/}
                          <div className="tools">
                            <i className="fas fa-edit" />
                            <i className="fas fa-trash-o" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* /.card-body */}
                  <div style={{ padding: "0px 20px 40px 20px" }}>
                    <div className="d-flex" style={{ gap: 10 }}>
                      <input
                        type="text"
                        placeholder="Write Something ..."
                        className="form-control"
                        style={{ width: "77%" }}
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                      />

                      {todoResponse.isLoading ? (
                        <div className="ml-3 mt-3">
                          <Loader size={25} />
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary float-right "
                          onClick={handleAddTodo}
                        >
                          <i className="fas fa-plus" /> Add Todo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* /.card */}
              </section>
              {/* /.Left col */}
              {/* right col (We are only adding the ID to make the widgets sortable)*/}
              <section className="col-lg-5 connectedSortable">
                {/* Map card */}
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
                    <Chart
                      chartEvents={[
                        {
                          eventName: "select",
                          callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;
                            const region = data[selection[0].row + 1];
                            console.log("Selected : " + region);
                          },
                        },
                      ]}
                      chartType="GeoChart"
                      width="100%"
                      height="200px"
                      data={data}
                      style={{ backgroundColor: "#047dff" }}
                    />
                  </div>
                  {/* /.card-body*/}
                  <div className="card-footer ">
                    <div className="row">
                      <div className="col-4 text-center">
                        <div id="sparkline-1" />
                        <div className="">
                          Today Visitors{" "}
                          <span style={{ fontWeight: 600 }}>2</span>
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
                <div className="card bg-gradient-success">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="far fa-calendar-alt mr-1" />
                      Events Calendar
                    </h3>
                    {/* tools card */}
                    <div className="card-tools">
                      {/* button with a dropdown */}
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-success btn-sm dropdown-toggle"
                          data-toggle="dropdown"
                          data-offset={-52}
                        >
                          <i className="fas fa-bars" />
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <Link to="/addevent" className="dropdown-item">
                            Add new event
                          </Link>
                          <Link to="/eventdirectory" className="dropdown-item">
                            Clear events
                          </Link>
                          {/* <div className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            View calendar
                          </a> */}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                    {/* /. tools */}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body pt-0">
                    {/*The calendar */}
                    <EventsCalendar events={events} />

                    {/* <div id="calendar" style={{ width: "100%" }} /> */}
                  </div>
                  {/* /.card-body */}
                </div>
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

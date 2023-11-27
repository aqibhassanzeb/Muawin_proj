import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/auth";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomModal from "../Modal";
import io from "socket.io-client";
import { useGetNotificationsQuery } from "../../api/api";
import moment from "moment";

const Navbar = () => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.authReducer.activeUser);
  const { data } = useGetNotificationsQuery();

  const [openAddNoti, setOpenAddNoti] = useState(false);
  const textRef = useRef();

  const dispatch = useDispatch();
  const navigagte = useNavigate();

  function handleLogout() {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("token");
    sessionStorage.removeItem("activeUser");
    sessionStorage.removeItem("token");
    dispatch(() => logout());
    navigagte("/");
  }

  // useEffect(() => {
  //   console.log("SOCKET LOG");
  //   const newSocket = io("http://localhost:3333");
  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  function handleSendNotification() {
    if (socket && textRef.current?.value) {
      socket.emit("adminBroadcast", textRef.current?.value);
      setOpenAddNoti(false);
    }
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-white navbar-light"
        style={{
          padding: "6px 20px",
          borderBottom: "1px solid #ededed",
        }}
      >
        {/* Left navbar links */}
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(handleDrawerOpen())}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </li> */}

          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="/dashboard" className="nav-link">
              {" "}
              Home{" "}
            </a>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <a href="/contact" className="nav-link">
              {" "}
              Contact{" "}
            </a>
          </li> */}
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}

          {/* Messages Dropdown Menu */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>

              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                {" "}
                See All Messages{" "}
              </a>
            </div>
          </li> */}

          {/* Notifications Dropdown Menu */}
          {user.role === "admin" ? (
            <div
              className="nav-link"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => setOpenAddNoti(true)}
            >
              <i className="fa fa-bell" />
              <span
                className="badge badge-info navbar-badge"
                style={{ position: "absolute" }}
              >
                <i className="fas fa-plus" />
              </span>
            </div>
          ) : (
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">
                  {data && data.length}
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  {data && data.length} Notification
                  {data && data.length > 1 ? "s" : ""}
                </span>
                <div className="dropdown-divider" />
                {data &&
                  data.map((not) => (
                    <div key={not._id} className="dropdown-item">
                      <div>
                        <i className="fas fa-envelope mr-2" />
                        <span style={{ fontSize: 12 }}>{not.message}</span>
                      </div>
                      <div>
                        <span
                          className="float-right text-muted"
                          style={{ fontSize: 10 }}
                        >
                          {moment(not.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  ))}
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li>
          )}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <li className="nav-item d-none d-sm-inline-block">
              <button
                onClick={handleLogout}
                className="btn  btn-outline-danger"
                style={{ outline: "none", border: "none", color: "black" }}
              >
                Logout
              </button>
            </li>
          </li>
        </ul>
      </nav>
      <CustomModal open={openAddNoti} setOpen={setOpenAddNoti}>
        <div className="form-group">
          <label>Enter Notification to be broadcast</label>
          <textarea
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            rows="2"
            ref={textRef}
          />
        </div>
        <div
          className="d-flex gap-5 justify-content-center align-items-center"
          style={{ gap: 10 }}
        >
          <button
            onClick={() => setOpenAddNoti(false)}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={handleSendNotification}
          >
            Send
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Navbar;

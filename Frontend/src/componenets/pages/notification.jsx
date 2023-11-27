import React from "react";
import "../css/notifications.css";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import moment from "moment";
import { useSelector } from "react-redux";

const Notifications = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const { state } = useLocation();
  return (
    <>
      <Navbar />
      <section class="section-50">
        <div class="container-fluid px-5">
          <h5 class="m-b-50 heading-line">
            Notifications <i class="fa fa-bell text-muted"></i>
          </h5>
          <div class="notification-ui_dd-content">
            {state?.notifications.map((not) => (
              <div
                key={not._id}
                class="notification-list notification-list--unread"
                style={{
                  backgroundColor: not.isReadBy.includes(user._id)
                    ? "white"
                    : "#f1f5f9",
                }}
              >
                <div class="notification-list_content">
                  <div class="notification-list_img">
                    <img src={not.notificationBy.image} alt="profile" />
                  </div>
                  <div class="notification-list_detail">
                    <p style={{ textAlign: "left", fontSize: 14 }}>
                      <b>{not.notificationBy.firstName}</b> sent you a
                      notification
                    </p>

                    <p
                      class="text-muted"
                      style={{ textAlign: "left", fontSize: 14 }}
                    >
                      {not.message}
                    </p>
                    <p class="text-muted" style={{ textAlign: "left" }}>
                      <small>{moment(not.createdAt).fromNow()}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div class="text-center">
            <a href="#!" class="dark-link">
              Load more activity
            </a>
          </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Notifications;

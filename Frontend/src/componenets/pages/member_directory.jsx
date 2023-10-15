import React from "react";
import Navbar from "../common/navbar";
import Sidenav from "../common/sidenav";
import Footer from "../common/footer";
import { useGetAllUsersQuery } from "../../api/api";
import moment from "moment";
import { useNavigate } from "react-router";
import { isActive } from "../../utils";

const Member_directory = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      {/* Navbar */}
      <Navbar />
      {/* /.navbar */}
      <Sidenav />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Member Directory</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Member Directory</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Member Directory</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped Events">
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>No.</th>
                    <th style={{ width: "20%" }}>Member Name</th>
                    <th style={{ width: "10%" }}>Role</th>
                    <th>Member Progress</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "20%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        <a>
                          {user.firstName} {user.lastName}
                        </a>
                        <br />
                        <small>{user.email}</small>
                        <br />
                        <small>
                          Created {moment(user.createdAt).format("DD.MM.YYYY")}
                        </small>
                      </td>
                      <td>
                        <a style={{ textTransform: "capitalize" }}>
                          {user.role}
                        </a>
                      </td>

                      <td className="Event_progress">
                        <div className="progress progress-sm">
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            aria-volumenow={57}
                            aria-volumemin={0}
                            aria-volumemax={100}
                            style={{ width: "57%" }}
                          ></div>
                        </div>
                        <small>57% Complete</small>
                      </td>
                      <td className="Event-state">
                        {isActive(user.last_active) ? (
                          <span className="badge badge-danger">Inactive</span>
                        ) : (
                          <span className="badge badge-success">Active</span>
                        )}
                      </td>
                      <td className="Event-actions text-right">
                        <button
                          onClick={() =>
                            navigate("/under-construction", {
                              state: { user },
                            })
                          }
                          className="btn btn-primary btn-sm"
                          style={{ marginRight: 5, marginBottom: 5 }}
                          href="/under-construction"
                        >
                          <i className="fas fa-folder"></i>
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigate("/under-construction", {
                              state: { user },
                            })
                          }
                          className="btn btn-info btn-sm"
                        >
                          <i className="fas fa-pencil-alt"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            // setSelectedId(user._id);
                            // setOpenDeleteDialogue(true);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default Member_directory;

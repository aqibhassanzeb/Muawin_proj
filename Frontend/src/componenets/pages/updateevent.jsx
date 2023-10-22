import React, { useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useUpdateEventMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";

const Updateevent = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();

  const [data, setData] = useState({
    name: state.event.name,
    description: state.event.description,
    status: state.event.status,
    venue: state.event.venue,
    leader: state.event.leader,
    budget: state.event.budget,
    spent: state.event.spent,
    duration: state.event.duration,
  });
  const [files, setFiles] = useState(state.event.files);

  function handleDelete(name) {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function handleUpdate() {
    update({ id: state.event._id, data: { ...data, files: [...files] } }).then(
      (res) => {
        if (res?.data?.message) {
          toast.success("Event Updated Successfully!");
        }
      }
    );
  }

  console.log(data);
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Event Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Edit Event</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">General</h3>
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
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">Event Name</label>
                    <input
                      name="name"
                      type="text"
                      id="inputName"
                      className="form-control"
                      value={data?.name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputDescription">Event Description</label>
                    <textarea
                      name="description"
                      id="inputDescription"
                      className="form-control"
                      rows={4}
                      value={data?.description}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStatus">Status</label>
                    <select
                      name="status"
                      className="form-control custom-select"
                      value={data?.status}
                      onChange={onChange}
                    >
                      <option value="" selected disabled>
                        Select one
                      </option>
                      <option value="upcoming">Upcoming</option>
                      <option value="in-progress">In Progress</option>
                      <option value="canceled">Canceled</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputClientCompany">Event Venue</label>
                    <input
                      name="venue"
                      type="text"
                      id="inputClientCompany"
                      className="form-control"
                      value={data?.venue}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEventLeader">Event Leader</label>
                    <input
                      name="leader"
                      type="text"
                      id="inputEventLeader"
                      className="form-control"
                      value={data?.leader}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Budget</h3>
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
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputEstimatedBudget">
                      Estimated budget
                    </label>
                    <input
                      name="budget"
                      type="number"
                      id="inputEstimatedBudget"
                      className="form-control"
                      step={1}
                      min={1}
                      value={data?.budget}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputSpentBudget">Total amount spent</label>
                    <input
                      name="spent"
                      type="number"
                      id="inputSpentBudget"
                      className="form-control"
                      step={1}
                      min={1}
                      value={data?.spent}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">
                      Estimated Event duration
                    </label>
                    <input
                      name="duration"
                      type="number"
                      id="inputEstimatedDuration"
                      className="form-control"
                      step={1}
                      min={1}
                      value={data.duration}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Files</h3>
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
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {files &&
                        files.map((file) => (
                          <tr key={file.name}>
                            <td>{file.name}</td>

                            <td>{Math.round(file.size / 1024)} KB</td>
                            <td className="text-right py-0 align-middle">
                              <div className="btn-group btn-group-sm">
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-info"
                                >
                                  <i className="fas fa-eye" />
                                </a>
                                <button
                                  onClick={() => handleDelete(file.name)}
                                  className="btn btn-danger"
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
          <div className="row" id="cap">
            <div className="col-12">
              <Link to="/eventdirectory" className="btn btn-secondary">
                Cancel
              </Link>

              {updateResp.isLoading ? (
                <div className="float-right" style={{ marginRight: 15 }}>
                  <Loader size={30} />
                </div>
              ) : (
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-success float-right"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default Updateevent;

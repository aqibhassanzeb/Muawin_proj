import React from "react";
import "../css/style.css";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { uploadFiles, useAddEventMutation } from "../../api/api";
import ProgressLoader from "../ProgressLoader";
import { toast } from "sonner";
import { eventValidationSchema, validateFiles } from "../../utils/validations";
import Datetime from "react-datetime";
import moment from "moment";
import { convertToUnix } from "../../utils";
import NotAuth from "./notauth";
import { useSelector } from "react-redux";

const Addevent = () => {
  const permissions = useSelector((state) => state.authReducer.permissions);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(eventValidationSchema),
  });

  const [addEvent] = useAddEventMutation();

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  async function onSubmit(data) {
    const isValid = await validateFiles(files, setError);
    console.log(isValid);
    if (isValid) {
      setProgress(25);
      uploadFiles(files, setProgress)
        .then((res) => {
          addEvent({
            name: data.name,
            description: data.description,
            status: data.status,
            venue: data.venue,
            leader: data.leader,
            budget: data.budget,
            spent: data.spent,
            duration: data.duration,
            date: convertToUnix(data.date, data.time),
            files: res,
          }).then((res) => {
            setProgress(0);
            setFiles([]);
            reset();
            setValue("status", "");
            if (res?.data?.message) {
              toast.success("Event Added Successfully");
            }
          });
        })
        .catch((err) => console.log(err.message));
    }
  }

  return (
    <div className="wrapper">
      <Navbar />
      {permissions.includes("create") ? (
        <div style={{ padding: "0 20px" }}>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Event Add</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Event Add</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <form
            style={{ marginLeft: 15, marginRight: 15 }}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                        <label htmlFor="inputName">
                          Event Name <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                          type="text"
                          id="inputName"
                          className="form-control"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="validation-error">
                            {errors.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDescription">
                          Event Description
                        </label>
                        <textarea
                          id="inputDescription"
                          className="form-control"
                          rows={4}
                          defaultValue={""}
                          {...register("description")}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputStatus">
                          Status <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control custom-select"
                          {...register("status")}
                        >
                          <option value="" defaultValue="" selected disabled>
                            Select one
                          </option>
                          <option value="upcoming">Upcoming</option>
                          <option value="in-progress">In Progress</option>
                          <option value="canceled">Canceled</option>
                          <option value="success">Success</option>
                        </select>
                        {errors.status && (
                          <p className="validation-error">
                            {errors.status?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputClientCompany">
                          Venue <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="inputClientCompany"
                          className="form-control"
                          {...register("venue")}
                        />
                        {errors.venue && (
                          <p className="validation-error">
                            {errors.venue?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputEventLeader">
                          Event Leader <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="inputEventLeader"
                          className="form-control"
                          {...register("leader")}
                        />
                        {errors.leader && (
                          <p className="validation-error">
                            {errors.leader?.message}
                          </p>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Event Date <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="date"
                              id="inputEventLeader"
                              className="form-control"
                              {...register("date")}
                            />
                            {errors.date && (
                              <p className="validation-error">
                                {errors.date?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Event Time <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="time"
                              id="inputEventLeader"
                              className="form-control"
                              {...register("time")}
                            />
                            {errors.time && (
                              <p className="validation-error">
                                {errors.time?.message}
                              </p>
                            )}
                          </div>
                        </div>
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
                          <span style={{ color: "red" }}> *</span>
                        </label>
                        <input
                          type="number"
                          id="inputEstimatedBudget"
                          className="form-control"
                          {...register("budget", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseInt(v, 10),
                          })}
                        />
                        {errors.budget && (
                          <p className="validation-error">
                            {errors.budget?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputSpentBudget">
                          Total amount spent
                          <span style={{ fontSize: 12, fontWeight: "normal" }}>
                            {" "}
                            (optional)
                          </span>
                        </label>
                        <input
                          type="number"
                          id="inputSpentBudget"
                          className="form-control"
                          {...register("spent")}
                        />
                        {errors.spent && (
                          <p className="validation-error">
                            {errors.spent?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputEstimatedDuration">
                          Estimated Event duration
                          <span style={{ fontSize: 12, fontWeight: 400 }}>
                            {" "}
                            (minutes)
                          </span>
                          <span style={{ color: "red" }}> *</span>
                        </label>
                        <input
                          type="number"
                          id="inputEstimatedDuration"
                          className="form-control"
                          {...register("duration", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseInt(v, 10),
                          })}
                        />
                        {errors.duration && (
                          <p className="validation-error">
                            {errors.duration?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="btn btn-default btn-file">
                          <i className="fas fa-paperclip" /> Attachment
                          <input
                            type="file"
                            name="attachment"
                            onChange={(e) => {
                              clearErrors("attachment");
                              setFiles(e.target.files);
                            }}
                            multiple
                          />
                        </div>
                        <p
                          style={{
                            display: "inline",
                            marginLeft: 5,
                          }}
                          className="help-block"
                        >
                          Max. 10 MB
                        </p>
                        <div style={{ marginTop: 10 }}>
                          {files.length > 0 &&
                            Array.from(files).map((file) => (
                              <div key={file.name}>{file.name}</div>
                            ))}
                        </div>

                        {errors.attachment && (
                          <p className="validation-error">
                            {errors.attachment?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>
              </div>
              <div className="row" id="cap">
                <div className="col-12">
                  <Link to="/" className="btn btn-secondary">
                    Cancel
                  </Link>
                  {progress > 0 ? (
                    <div className="float-right" style={{ marginRight: 10 }}>
                      <ProgressLoader progress={progress} />
                    </div>
                  ) : (
                    <input
                      type="submit"
                      defaultValue="Create new Porject"
                      className="btn btn-success float-right"
                    />
                  )}
                </div>
              </div>
            </section>
          </form>
          {/* /.content */}
        </div>
      ) : (
        <div style={{ minHeight: "83vh" }}>
          <NotAuth />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Addevent;

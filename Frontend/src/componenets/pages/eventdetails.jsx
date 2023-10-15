import React from "react";
import Navbar from "../common/navbar";
import Sidenav from "../common/sidenav";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { uploadFiles, useUpdateEventMutation } from "../../api/api";
import { toast } from "sonner";
import { validateFiles } from "../../utils/validations";
import ProgressLoader from "../ProgressLoader";
import moment from "moment";
import { convertMinutes } from "../../utils";

const Eventdetails = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();
  const [stateFiles, setStateFiles] = useState(state?.event?.files);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState({});

  function handleImageDelete(index) {
    const updatedItems = Array.from(files).filter((file, i) => i !== index);
    setFiles(updatedItems);
  }

  async function handleUpload() {
    const isValid = await validateFiles(files, setError);
    if (isValid) {
      setProgress(25);
      uploadFiles(files, setProgress)
        .then((res) => {
          setFiles([]);
          setStateFiles([...stateFiles, ...res]);
          update({
            id: state.event._id,
            data: { files: [...state.event.files, ...res] },
          }).then((res) => {
            setProgress(0);
            if (res?.data?.message) {
              toast.success("Files Added Successfully");
            }
          });
        })
        .catch((err) => console.log(err.message));
    }
  }

  console.log(files);
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
                <h1>Event Detail</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Event Detail</li>
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
              <h3 className="card-title">Event Detail</h3>
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
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-center text-muted">
                            Estimated budget
                          </span>
                          <span className="info-box-number text-center text-muted mb-0">
                            {state?.event?.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-center text-muted">
                            Total amount spent
                          </span>
                          <span className="info-box-number text-center text-muted mb-0">
                            {state?.event?.spent}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-center text-muted">
                            Estimated Event duration
                          </span>
                          <span className="info-box-number text-center text-muted mb-0">
                            {convertMinutes(state?.event?.duration)}
                            <span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-paint-brush" /> {state?.event?.name}
                  </h3>
                  <p className="text-muted">{state?.event?.description}</p>
                  <br />
                  <div className="text-muted">
                    <p className="text-sm">
                      Venue
                      <b className="d-block">{state?.event?.venue}</b>
                    </p>
                    <p className="text-sm">
                      Event Leader
                      <b className="d-block">{state?.event?.leader}</b>
                    </p>
                    <p className="text-sm">
                      Event Date
                      <b className="d-block">
                        {moment
                          .unix(state?.event?.date)
                          .format("MMMM Do YYYY, h:mm:ss a")}
                      </b>
                    </p>
                  </div>
                  <h5 className="mt-5 text-muted">Event files</h5>
                  <ul className="list-unstyled">
                    {stateFiles.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-link text-secondary"
                        >
                          <i className="far fa-fw fa-file-word" /> {file.name}
                        </a>
                      </li>
                    ))}
                    {files.length > 0 &&
                      Array.from(files).map((file, index) => (
                        <li key={file.name}>
                          <a className="btn-link text-secondary">
                            <i className="far fa-fw fa-file-word" /> {file.name}
                            <HighlightOffIcon
                              onClick={() => handleImageDelete(index)}
                              sx={{
                                fontSize: 18,
                                color: "red",
                                marginLeft: 0.5,
                                "&:hover": {
                                  cursor: "pointer",
                                  color: "darkred",
                                },
                              }}
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-2 mb-3">
                    {progress > 0 ? (
                      <ProgressLoader progress={progress} />
                    ) : files.length > 0 ? (
                      <div className="form-group">
                        <div
                          className="btn btn-sm btn-primary btn-file"
                          onClick={handleUpload}
                        >
                          <i className="fas fa-upload" /> Upload
                        </div>
                      </div>
                    ) : (
                      <div className="form-group">
                        <div className="btn btn-sm btn-primary btn-file">
                          <i className="fas fa-paperclip" /> Add Files
                          <input
                            type="file"
                            name="attachment"
                            onChange={(e) => {
                              setFiles(e.target.files);
                            }}
                            multiple
                          />
                        </div>
                        <p
                          style={{
                            display: "inline",
                            marginLeft: 5,
                            fontSize: 12,
                          }}
                          className="help-block"
                        >
                          Max. 10 MB
                        </p>
                        {error.attachment && (
                          <p className="validation-error">
                            {error.attachment?.message}
                          </p>
                        )}
                      </div>
                    )}
                    {/* <button className="btn btn-sm btn-primary">
                      Add Files
                    </button> */}
                    {/* <a href="#" className="btn btn-sm btn-warning">
                      Report contact
                    </a> */}
                  </div>
                </div>
              </div>
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

export default Eventdetails;

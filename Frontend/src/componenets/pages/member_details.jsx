import React from "react";
import Navbar from "../common/navbar";
import Sidenav from "../common/sidenav";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useUpdateEventMutation } from "../../api/api";
import { toast } from "sonner";
import moment from "moment";
import { convertMinutes } from "../../utils";

const MemberDetails = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();
  console.log(state);

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
              <div className="col-12 col-sm-6">
                <h1>Member Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Member Details</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {state?.user?.firstName} {state?.user?.lastName} Detail's
              </h3>
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
            <div className="card-body mx-5">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-user" /> Personal Information
                  </h3>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Name :</b>
                      <span className="member-text">
                        {state?.user?.firstName} {state?.user?.lastName}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Date Of Birth :</b>
                      <span className="member-text">{state?.user?.dob}</span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Gender :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.gender}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Contact :</b>
                      <span className="member-text text-capitalize">
                        0{state?.user?.phone}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Email :</b>
                      <span className="member-text">{state?.user?.email}</span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Nationality :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.nationality}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Address :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.address}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Province / State :</b>
                      <span className="member-text">
                        {state?.user?.province}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">City :</b>
                      <span className="member-text">{state?.user?.city}</span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">ZIP :</b>
                      <span className="member-text">{state?.user?.zip}</span>
                    </p>

                    <p className="text-left">
                      <b className="text-sm mr-2">Blood Group :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.blood}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Religion :</b>
                      <span className="member-text">
                        {state?.user?.religion}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Weight (kg) :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.weight}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Height (cm) :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.height}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Marital Status :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.maritalStatus}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Medical Condition :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.medicalCondition}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Emergency Contact :</b>
                      <span className="member-text text-capitalize">
                        0{state?.user?.emergencyContact}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-briefcase" /> Professional Information
                  </h3>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Current Job Title :</b>
                      <span className="member-text">
                        {state?.user?.jobTitle}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">
                        Company / Organization Name :
                      </b>
                      <span className="member-text">
                        {state?.user?.company}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Industry :</b>
                      <span className="member-text">
                        {state?.user?.industry}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Job Responsibilities :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.responsibilities}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Professional Skills :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.skills}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Work-related References :</b>
                      <span className="member-text">
                        {state?.user?.references}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">
                        Certifications or Licenses :
                      </b>
                      <span className="member-text text-capitalize">
                        {state?.user?.licenses}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">
                        Previous Employers and Positions :
                      </b>
                      <span className="member-text">
                        {state?.user?.positions}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Work History :</b>
                      <span className="member-text">
                        {state?.user?.workHistory}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Work Experience :</b>
                      <span className="member-text">
                        {state?.user?.workExperience}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-graduation-cap" /> Educational
                    Information
                  </h3>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Education Level :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.educationLevel}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">
                        Name of School / College / University :
                      </b>
                      <span className="member-text">
                        {state?.user?.institute}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Major / Field Of Study :</b>
                      <span className="member-text">{state?.user?.major}</span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Graduation Year :</b>
                      <span className="member-text">
                        {state?.user?.graduationYear}
                      </span>
                    </p>

                    <p className="text-left">
                      <b className="text-sm mr-2">
                        GPA or Academic Achievements :
                      </b>
                      <span className="member-text text-capitalize">
                        {state?.user?.certificates}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">
                        Certifications or Degrees Earned :
                      </b>
                      <span className="member-text">{state?.user?.gpa}</span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Academic Honors/Awards :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.awards}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-users" /> Family Information
                  </h3>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Father Name :</b>
                      <span className="member-text">
                        {state?.user?.fatherName}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Mother Name :</b>
                      <span className="member-text">
                        {state?.user?.motherName}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Spouse Name</b>
                      <span style={{ fontSize: 12 }}>(if any) : </span>
                      <span className="member-text text-capitalize">
                        {state?.user?.spouseName}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Dependents :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.dependents}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Siblings :</b>
                      <span className="member-text">
                        {state?.user?.siblings}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Family Contact :</b>
                      <span className="member-text text-capitalize">
                        0{state?.user?.familyContact}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i className="fas fa-folder" /> Other Information
                  </h3>
                  <br />
                  <div className="text-muted">
                    <p className="text-left">
                      <b className="text-sm mr-2">Interests/Hobbies :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.interests}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Languages Spoken :</b>
                      <span className="member-text">
                        {state?.user?.languages}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Social Media Profiles :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.socialMediaProfiles}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Volunteer Work :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.volunteerWork}
                      </span>
                    </p>
                    <p className="text-left">
                      <b className="text-sm mr-2">Military Service :</b>
                      <span className="member-text text-capitalize">
                        {state?.user?.militaryServices}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MemberDetails;

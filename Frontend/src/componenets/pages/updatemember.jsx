import React, { useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";
import Sidenav from "../common/sidenav";
import Footer from "../common/footer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useUpdateEventMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";

const UpdateMember = () => {
  const [update, updateResp] = useUpdateEventMutation();

  const { state } = useLocation();
  console.log(state.user);
  const initialValues = {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    address: state.user.address,
    blood: state.user.blood,
    city: state.user.city,
    dob: state.user.dob,
    email: state.user.email,
    gender: state.user.gender,
    height: state.user.height,
    maritalStatus: state.user.maritalStatus,
    medicalCondition: state.user.medicalCondition,
    nationality: state.user.nationality,
    phone: state.user.phone,
    province: state.user.province,
    religion: state.user.religion,
    weight: state.user.weight,
    zip: state.user.zip,
    emergencyContact: state.user.emergencyContact,
    fatherName: state.user.fatherName,
    motherName: state.user.motherName,
    spouseName: state.user.spouseName,
    dependents: state.user.dependents,
    siblings: state.user.siblings,
    familyContact: state.user.familyContact,
    educationLevel: state.user.educationLevel,
    institute: state.user.institute,
    major: state.user.major,
    graduationYear: state.user.graduationYear,
    certificates: state.user.certificates,
    gpa: state.user.gpa,
    awards: state.user.awards,
    jobTitle: state.user.jobTitle,
    industry: state.user.industry,
    responsibilities: state.user.responsibilities,
    skills: state.user.skills,
    references: state.user.references,
    company: state.user.company,
    licenses: state.user.licenses,
    positions: state.user.positions,
    workHistory: state.user.workHistory,
    workExperience: state.user.workExperience,
    interests: state.user.interests,
    languages: state.user.languages,
    socialMediaProfiles: state.user.socialMediaProfiles,
    volunteerWork: state.user.volunteerWork,
    militaryServices: state.user.militaryServices,
  };

  const [data, setData] = useState(initialValues);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function handleUpdate() {
    toast.success("Under Construction");
    // update({ id: state.event._id, data: { ...data, files: [...files] } }).then(
    //   (res) => {
    //     if (res?.data?.message) {
    //       toast.success("Event Updated Successfully!");
    //     }
    //   }
    // );
  }

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
                <h1>Member Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Member</li>
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
                  <h3 className="card-title">Personal Info</h3>
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={data?.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={data?.lastName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date Of Birth :</label>
                    <input
                      name="dob"
                      type="text"
                      id="dob"
                      className="form-control"
                      value={data?.dob}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      name="gender"
                      type="text"
                      id="gender"
                      className="form-control"
                      value={data?.gender}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Contact</label>
                    <input
                      name="phone"
                      type="text"
                      id="phone"
                      className="form-control"
                      value={data?.phone}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      id="email"
                      className="form-control"
                      value={data?.email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Nationality</label>
                    <input
                      name="nationality"
                      type="text"
                      id="nationality"
                      className="form-control"
                      value={data?.nationality}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="province">Province / State</label>
                    <input
                      name="province"
                      type="text"
                      id="province"
                      className="form-control"
                      value={data?.province}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      name="city"
                      type="text"
                      id="city"
                      className="form-control"
                      value={data?.city}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    <input
                      name="zip"
                      type="text"
                      id="zip"
                      className="form-control"
                      value={data?.zip}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      name="address"
                      type="text"
                      id="address"
                      className="form-control"
                      value={data?.address}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blood">Blood Group</label>
                    <input
                      name="blood"
                      type="text"
                      id="blood"
                      className="form-control"
                      value={data?.blood}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input
                      name="religion"
                      type="text"
                      id="religion"
                      className="form-control"
                      value={data?.religion}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      name="weight"
                      type="text"
                      id="weight"
                      className="form-control"
                      value={data?.weight}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="height">Height (cm)</label>
                    <input
                      name="height"
                      type="text"
                      id="height"
                      className="form-control"
                      value={data?.height}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <input
                      name="maritalStatus"
                      type="text"
                      id="maritalStatus"
                      className="form-control"
                      value={data?.maritalStatus}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="medicalCondition">Medical Condition</label>
                    <input
                      name="medicalCondition"
                      type="text"
                      id="medicalCondition"
                      className="form-control"
                      value={data?.medicalCondition}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact</label>
                    <input
                      name="emergencyContact"
                      type="text"
                      id="emergencyContact"
                      className="form-control"
                      value={data?.emergencyContact}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Family Info</h3>
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
                    <label>
                      Father's Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.fatherName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Spouse's Full Name{" "}
                      <span style={{ fontWeight: 400, fontSize: 13 }}>
                        (if applicable){" "}
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.spouseName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Siblings' Names and Ages</label>
                    <textarea
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="4"
                      value={data?.siblings}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Mother's Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.motherName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Number of Dependents{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.dependents}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Family Contact Information{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.dependents}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Professional Info</h3>
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
                    <label htmlFor="jobTitle">Current Job Title</label>
                    <input
                      name="jobTitle"
                      type="text"
                      id="jobTitle"
                      className="form-control"
                      value={data?.jobTitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">
                      Company / Organization Name :
                    </label>
                    <input
                      name="company"
                      type="text"
                      id="company"
                      className="form-control"
                      value={data?.company}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                      name="industry"
                      type="text"
                      id="industry"
                      className="form-control"
                      value={data?.industry}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="responsibilities">
                      Job Responsibilities
                    </label>
                    <textarea
                      name="responsibilities"
                      type="text"
                      id="responsibilities"
                      className="form-control"
                      value={data?.responsibilities}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="skills">Professional Skills</label>
                    <textarea
                      name="skills"
                      type="text"
                      id="skills"
                      className="form-control"
                      value={data?.skills}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="references">Work-related References</label>
                    <textarea
                      name="references"
                      type="text"
                      id="references"
                      className="form-control"
                      value={data?.references}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="licenses">Certifications or Licenses</label>
                    <textarea
                      name="licenses"
                      type="text"
                      id="licenses"
                      className="form-control"
                      value={data?.licenses}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="references">Work-related References</label>
                    <textarea
                      name="references"
                      type="text"
                      id="references"
                      className="form-control"
                      value={data?.references}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="positions">
                      Previous Employers and Positions :
                    </label>
                    <textarea
                      name="positions"
                      type="text"
                      id="positions"
                      className="form-control"
                      value={data?.positions}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="workHistory">Work History</label>
                    <textarea
                      name="workHistory"
                      type="text"
                      id="workHistory"
                      className="form-control"
                      value={data?.workHistory}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="workExperience">Work Experience</label>
                    <input
                      name="workExperience"
                      type="number"
                      id="workExperience"
                      className="form-control"
                      value={data?.workExperience}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Educational Info</h3>
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
                <div className="card-body pt-1 px-4">
                  <div className="form-group">
                    <label>
                      Education Level <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="educationLevel"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.educationLevel}
                      onChange={onChange}
                    >
                      <option value="" selected defaultValue disabled>
                        {" "}
                      </option>
                      <option value="ssc">SSC</option>
                      <option value="hssc">HSSC</option>
                      <option value="graduation">Graduation</option>
                      <option value="post-graduation">Post Graduation</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Major / Field Of Study{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.major}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>GPA or Academic Achievements</label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="2"
                      value={data.gpa}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Academic Honors/Awards</label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.awards}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Name of School / College / University{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.institute}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.graduationYear}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Certifications or Degrees Earned </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.certificates}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Other Info</h3>
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
                <div className="card-body pt-1 px-4">
                  <div className="form-group">
                    <label>
                      Interests/Hobbies <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="2"
                      value={data?.interests}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Social Media Profiles
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.socialMediaProfiles}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Military Service{" "}
                      <span style={{ fontSize: 10, fontWeight: 400 }}>
                        (if applicable)
                      </span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.militaryServices}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Languages Spoken <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.languages}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Volunteer Work <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.volunteerWork}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
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

export default UpdateMember;
